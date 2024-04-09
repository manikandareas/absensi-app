import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { DbService } from '../db/db.service';
import * as schema from '~/core/db/db.schema';
import { hasValue, isIncludeInArea } from '~/lib/utils';
import { and, eq, sql } from 'drizzle-orm';
import { CreateClassPresenceDto } from './dto/create-class-presences.dto';
import { QrcodeService } from '~/lib/qrcode/qrcode.service';
import { MakeAttendanceInDto } from './dto/make-attendance-in.dto';
import { UpdateClassPresenceDto } from './dto/update-class-presences.dto';
import { addMinutes, differenceInMinutes } from 'date-fns';

@Injectable()
export class ClassesService {
  constructor(
    private readonly dbService: DbService,
    private readonly qrCodeService: QrcodeService,
  ) {}
  private readonly db = this.dbService.getDb();

  async createClass(lecturerId: string, createClassDto: CreateClassDto) {
    if (createClassDto.invitationToken) {
      const existingClass = await this.queryClassByInvitationToken(
        createClassDto.invitationToken,
      );

      if (existingClass && hasValue(existingClass))
        throw new ConflictException(
          `Failed created class with invitation token ${createClassDto.invitationToken}`,
        );
    }

    const payload = await this.db
      .insert(schema.classes)
      .values({
        ...createClassDto,
        lecturerId,
      })
      .returning();

    return payload[0];
  }

  async findOneClass(classId: string) {
    const payload = await this.queryClassById(classId);

    if (!payload || !hasValue(payload))
      throw new NotFoundException(`Class with id ${classId} not found`);

    return payload;
  }

  async updateClass(classId: string, updateClassDto: UpdateClassDto) {
    await this.findOneClass(classId);

    const payload = await this.db
      .update(schema.classes)
      .set(updateClassDto)
      .where(eq(schema.classes.id, classId))
      .returning();

    return payload[0];
  }

  async removeClass(classId: string) {
    await this.findOneClass(classId);
    await this.db.delete(schema.classes).where(eq(schema.classes.id, classId));
  }

  async queryClassByInvitationToken(invitationToken: string) {
    return await this.db.query.classes.findFirst({
      where: (classes, { eq }) => eq(classes.invitationToken, invitationToken),
    });
  }

  async queryClassById(classId: string) {
    const [students, classRes] = await Promise.all([
      this.db.query.userClasses
        .findMany({
          where: (userClasses, { eq }) => eq(userClasses.classId, classId),
          with: {
            user: {
              columns: {
                name: true,
                email: true,
                universityId: true,
              },
              with: {
                contacts: true,
              },
            },
          },
        })
        .then((res) => res.map((d) => d.user)),
      this.db.query.classes.findFirst({
        where: (classes, { eq }) => eq(classes.id, classId),
      }),
    ]);
    return {
      ...classRes,
      students,
    };
  }

  async queryClassBySlug(classSlug: string) {
    return await this.db.query.classes.findFirst({
      where: (classes, { eq }) => eq(classes.slug, classSlug),
      with: {
        lecturer: {
          columns: {
            id: true,
            name: true,
            email: true,
            universityId: true,
          },
          with: {
            contacts: true,
          },
        },
      },
    });
  }

  async findOneClassBySlug(classSlug: string) {
    const payload = await this.queryClassBySlug(classSlug);
    if (!payload || !hasValue(payload))
      throw new NotFoundException(`Class with slug ${classSlug} not found`);

    // const countStudents = await this.db
    //   .select({
    //     count: sql<number>`cast(count(${schema.userClasses.id}) as int)`,
    //   })
    //   .from(schema.userClasses)
    //   .where(eq(schema.userClasses.classId, payload.id));

    const classRes = await this.findOneClass(payload.id);

    return {
      ...classRes,
      lecturer: payload.lecturer,
      studentsCount: classRes.students.length,
    };
  }

  async createClassPresence(
    userId: string,
    classId: string,
    createClassPresenceDto: CreateClassPresenceDto,
  ) {
    await this.findOneClass(classId);

    const DEFAULT_EXPIRE_MINUTES = 5;

    const expireAt = addMinutes(
      new Date(),
      createClassPresenceDto.expireMinutes ?? DEFAULT_EXPIRE_MINUTES,
    );

    const payload = await this.db
      .insert(schema.classPresences)
      .values({
        ...createClassPresenceDto,
        classId,
        lecturerId: userId,
        expireAt,
      })
      .returning();

    return payload[0];
  }

  async createPresenceBarcode(classId: string, classPresenceId: string) {
    const url = `http://localhost:8000/api/classes/${classId}/presences/${classPresenceId}`;
    const qrCodeURL: string = await this.qrCodeService.generateQrCode(url);

    const classPresence = await this.db.query.classPresences.findFirst({
      where: (classPresence, { and, eq }) =>
        and(
          eq(classPresence.classId, classId),
          eq(classPresence.id, classPresenceId),
        ),
    });

    if (!classPresence || !hasValue(classPresence))
      throw new NotFoundException(
        `Class presence with id ${classPresenceId} not found`,
      );

    const barcode = await this.db
      .insert(schema.barcodes)
      .values({
        url: qrCodeURL,
        stringUrl: url,
      })
      .returning()
      .then((val) => val[0]);

    const updatedClassPresence = await this.db
      .update(schema.classPresences)
      .set({ barcodeId: barcode.id })
      .where(eq(schema.classPresences.id, classPresenceId))
      .returning();

    return {
      ...updatedClassPresence[0],
      barcodeUrl: qrCodeURL,
    };
  }

  async makeAttendanceIn(
    userId: string,
    classPresencesId: string,
    makeAttendanceInDto: MakeAttendanceInDto,
  ) {
    const METERS_TOLERANCE = 500;
    let status;

    const classPresence = await this.db.query.classPresences.findFirst({
      where: (cp, { eq }) => eq(cp.id, classPresencesId),
    });

    if (!classPresence || !hasValue(classPresence))
      throw new NotFoundException(
        `Class presence with id ${classPresencesId} not found`,
      );

    const isUserAlreadyAbsent = await this.db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(schema.userPresences)
      .where(
        and(
          eq(schema.userPresences.classPresencesId, classPresencesId),
          eq(schema.userPresences.userId, userId),
        ),
      )
      .then((res) => res[0].count);

    if (isUserAlreadyAbsent > 0) {
      throw new BadRequestException(
        'You have already made an attendance in this class',
      );
    }

    if (classPresence.isSecure) {
      const isUserInSameArea = isIncludeInArea(
        classPresence.geolocation!,
        makeAttendanceInDto.geolocation,
        METERS_TOLERANCE,
      );

      if (!isUserInSameArea) {
        throw new BadRequestException(
          'You must be in the area to take attendance.',
        );
      }
    }

    const differentTime = differenceInMinutes(
      new Date(),
      classPresence.expireAt!,
    );

    if (differentTime > classPresence.toleranceTimes!) {
      status = schema.PresencesStatus.ABSENT;
    } else if (
      differentTime > 0 &&
      differentTime <= classPresence.toleranceTimes!
    ) {
      status = schema.PresencesStatus.LATE;
    } else {
      status = schema.PresencesStatus.PRESENT;
    }

    const userPresence = await this.db
      .insert(schema.userPresences)
      .values({
        ...makeAttendanceInDto,
        status,
        classPresencesId,
        userId,
      })
      .returning();

    return userPresence[0];
  }

  async findClassPresences(classId: string) {
    await this.findOneClass(classId);

    const payload = await this.db.query.classPresences.findMany({
      where: (classPresence, { eq }) => eq(classPresence.classId, classId),
      orderBy: (classPresences, { desc }) => [desc(classPresences.createdAt)],
    });

    return payload;
  }

  async queryClassPresenceById(classId: string, classPresenceId: string) {
    return await this.db.query.classPresences.findFirst({
      where: (classPresence, { eq, and }) =>
        and(
          eq(classPresence.classId, classId),
          eq(classPresence.id, classPresenceId),
        ),
      with: {
        class: true,
        barcode: true,
        userPresences: {
          columns: {
            id: true,
            status: true,
            createdAt: true,
            geolocation: true,
            message: true,
          },
          with: {
            user: {
              columns: {
                id: true,
                name: true,
                email: true,
                universityId: true,
              },
            },
          },
        },
        lecturer: {
          columns: {
            id: true,
            name: true,
            email: true,
            universityId: true,
          },
        },
      },
    });
  }

  async findOneClassPresence(classId: string, classPresenceId: string) {
    const payload = await this.queryClassPresenceById(classId, classPresenceId);

    if (!payload || !hasValue(payload))
      throw new NotFoundException(
        `Class Presence with id ${classPresenceId} not found`,
      );

    return payload;
  }

  async removeClassPresence(classId: string, classPresenceId: string) {
    await this.findOneClassPresence(classId, classPresenceId);
    await this.db
      .delete(schema.classPresences)
      .where(
        and(
          eq(schema.classPresences.classId, classId),
          eq(schema.classPresences.id, classPresenceId),
        ),
      );
  }

  async updateClassPresence(
    classId: string,
    classPresenceId: string,
    updateClassPresenceDto: UpdateClassPresenceDto,
  ) {
    await this.findOneClassPresence(classId, classPresenceId);

    // if (updateClassPresenceDto.expireMinutes) {
    //   const expireAt = addMinutes(
    //     classPresence.createdAt!,
    //     updateClassPresenceDto.expireMinutes,
    //   );

    //   const payload = await this.db
    //     .update(schema.classPresences)
    //     .set({
    //       ...updateClassPresenceDto,
    //       expireAt,
    //     })
    //     .where(
    //       and(
    //         eq(schema.classPresences.id, classPresenceId),
    //         eq(schema.classPresences.classId, classId),
    //       ),
    //     )
    //     .returning();

    //   return payload[0];
    // }
    const payload = await this.db
      .update(schema.classPresences)
      .set(updateClassPresenceDto)
      .where(
        and(
          eq(schema.classPresences.id, classPresenceId),
          eq(schema.classPresences.classId, classId),
        ),
      )
      .returning();

    return payload[0];
  }
}
