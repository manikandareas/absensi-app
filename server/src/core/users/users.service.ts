import {
  BadGatewayException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from '../db/db.service';
import * as schema from '~/core/db/db.schema';
import { hash } from 'bcrypt';
import { eq, sql } from 'drizzle-orm';
import { hasValue } from '~/lib/utils';
import { JoinClassDto } from './dto/join-class.dto';
import { ClassesService } from '../classes/classes.service';
import { PaginationDTO } from '../dto/pagination.dto';
import { CreateOrUpdateContactsDTO } from './dto/create-or-update-contacts.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbService: DbService,
    private readonly classesService: ClassesService,
  ) {}
  private readonly db = this.dbService.getDb();

  async create(createUserDto: CreateUserDto) {
    const existingEmail = await this.queryUserByEmail(createUserDto.email);

    if (existingEmail) throw new ConflictException('Email or id already exist');

    const createdUsers = await this.db
      .insert(schema.users)
      .values({
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      })
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...createdUser } = createdUsers[0];

    return createdUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(userId: string) {
    const payload = await this.queryUserById(userId);
    if (!payload || !hasValue(payload))
      throw new NotFoundException(`User with id ${userId} not found`);

    return payload;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    await this.findOneById(userId);

    const updatedUser = await this.db
      .update(schema.users)
      .set(updateUserDto)
      .where(eq(schema.users.id, userId))
      .returning();
    return updatedUser[0];
  }

  async removeUser(userId: string) {
    await this.findOneById(userId);
    await this.db.delete(schema.users).where(eq(schema.users.id, userId));
  }

  async findByEmail(email: string) {
    const payload = await this.queryUserByEmail(email);
    if (!payload || !hasValue(payload))
      throw new NotFoundException(`User with email ${email} not found`);

    return payload;
  }

  async findAllUserClasses(userId: string) {
    await this.findOneById(userId);

    const userClasses = await this.db.query.userClasses
      .findMany({
        where: eq(schema.userClasses.userId, userId),
        with: {
          class: {
            with: {
              lecturer: {
                columns: {
                  name: true,
                  email: true,
                  universityId: true,
                },
              },
            },
          },
        },
        columns: {
          id: true,
          classId: false,
          userId: false,
        },
      })
      .then((res) => res.map((d) => d.class));
    return userClasses;
  }

  // async countUserPresenceByPresenceId(presenceId: string) {
  //   return await this.db
  //     .select({ count: sql`count(*)`.mapWith(Number) })
  //     .from(schema.userPresences)
  //     .where(eq(schema.userPresences.classPresencesId, presenceId))
  //     .then((res) => res[0].count);
  // }
  async createOrUpdateContacts(
    userId: string,
    contactsDTO: CreateOrUpdateContactsDTO,
  ) {
    await this.findOneById(userId);

    const response = await this.db
      .insert(schema.contacts)
      .values({
        ...contactsDTO,
        userId,
      })
      .onConflictDoUpdate({
        target: schema.contacts.userId,
        set: contactsDTO,
      })
      .returning();

    await this.db
      .update(schema.users)
      .set({ contactsId: response[0].id })
      .where(eq(schema.users.id, userId));

    return response[0];
  }

  async findUserContacts(userId: string) {
    const user = await this.findOneById(userId);

    const contacts = await this.db.query.contacts.findFirst({
      where: (contacts, { eq }) => eq(contacts.userId, userId),
    });

    return {
      ...contacts,
      user,
    };
  }

  async findAllLectureClasses(userId: string) {
    await this.findOneById(userId);

    const lectureClasses = await this.db.query.classes.findMany({
      where: eq(schema.classes.lecturerId, userId),
      with: {
        lecturer: {
          columns: {
            name: true,
            email: true,
            universityId: true,
          },
        },
      },
    });
    return lectureClasses;
  }

  async findLectureOverview(lecturerId: string) {
    const [classesCount, presencesCount, recentClassPresences] =
      await Promise.all([
        this.db
          .select({ count: sql`count(*)`.mapWith(Number) })
          .from(schema.classes)
          .where(eq(schema.classes.lecturerId, lecturerId)),
        this.db
          .select({ count: sql`count(*)`.mapWith(Number) })
          .from(schema.classPresences)
          .where(eq(schema.classPresences.lecturerId, lecturerId)),
        this.db.query.classPresences.findMany({
          where: (classPresences, { eq }) =>
            eq(classPresences.lecturerId, lecturerId),
          orderBy: (classPresences, { desc }) => [
            desc(classPresences.createdAt),
          ],
          with: {
            class: true,
          },
          limit: 5,
        }),
      ]);

    return {
      classesCount: classesCount[0].count,
      presencesCount: presencesCount[0].count,
      recentClassPresences,
    };
  }
  async findUserOverview(userId: string) {
    const [classesCount, presencesCount, recentAttendances] = await Promise.all(
      [
        this.db
          .select({ count: sql`count(*)`.mapWith(Number) })
          .from(schema.userClasses)
          .where(eq(schema.userClasses.userId, userId)),
        this.db
          .select({ count: sql`count(*)`.mapWith(Number) })
          .from(schema.userPresences)
          .where(eq(schema.userPresences.userId, userId)),
        this.db.query.userPresences.findMany({
          where: (userPresences, { eq }) => eq(userPresences.userId, userId),
          orderBy: (presences, { desc }) => [desc(presences.createdAt)],
          limit: 5,
          with: {
            classPresences: {
              with: {
                class: true,
                lecturer: {
                  columns: {
                    id: true,
                    name: true,
                    email: true,
                    universityId: true,
                  },
                },
              },
            },
          },
        }),
      ],
    );

    // {
    //   classesCount:number,
    //   presencesCount:number,
    //   ongoingPresenceCount:number,
    //   recentAttendances: []attendance
    // }
    return {
      classesCount: classesCount[0].count,
      presencesCount: presencesCount[0].count,
      recentAttendances,
    };
  }

  async joinClass(userId: string, joinClassDto: JoinClassDto) {
    await this.findOneById(userId);

    const classes = await this.classesService.queryClassByInvitationToken(
      joinClassDto.invitationToken,
    );

    if (!classes || !hasValue(classes))
      throw new BadGatewayException(`Invitation token is not valid`);

    const isUserReadyInClass = await this.db.query.userClasses.findFirst({
      where: (userClass, { eq, and }) =>
        and(eq(userClass.userId, userId), eq(userClass.classId, classes.id)),
    });

    if (isUserReadyInClass)
      throw new ConflictException('User already in class');

    const payload = await this.db
      .insert(schema.userClasses)
      .values({
        classId: classes.id,
        userId,
      })
      .returning();

    return {
      payload: payload[0],
      classTitle: classes.title,
    };
  }

  async findAllUserPresences(userId: string, paginate: PaginationDTO) {
    await this.findOneById(userId);

    const { page, limit } = paginate;

    const userPresences = await this.db.query.userPresences.findMany({
      orderBy: (presences, { desc }) => [desc(presences.createdAt)],
      where: eq(schema.userPresences.userId, userId),
      limit,
      offset: (page - 1) * limit,
      with: {
        // status: true,
        classPresences: {
          with: {
            class: true,
          },
        },
      },
    });

    return {
      data: userPresences,
      meta: {
        limit,
        page,
        total: userPresences.length,
      },
    };
  }

  async findAllOngoingUserPresences(userId: string) {
    const userClasses = await this.db.query.userClasses
      .findMany({
        where: eq(schema.userClasses.userId, userId),
        columns: {
          classId: true,
        },
      })
      .then((res) => res.map((d) => d.classId));

    const response = await this.db.query.classPresences.findMany({
      where: (classPresences, { gt, and, inArray }) =>
        and(
          inArray(classPresences.classId, userClasses),
          gt(classPresences.expireAt, new Date()),
        ),
      with: {
        class: true,
      },
    });
    return response;
  }

  // orderBy: [desc(schema.posts.updatedAt)]
  async queryUserById(userId: string) {
    return await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
    });
  }

  async queryByUniversityId(universityId: string) {
    return await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.universityId, universityId),
    });
  }

  async queryUserByEmail(email: string) {
    return await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
  }

  async isOwnerClass(lecturerId: string, classId: string) {
    await this.classesService.findOneClass(classId);

    const payload = await this.db.query.classes.findFirst({
      where: (classes, { eq }) => eq(classes.id, classId),
      columns: {
        createdAt: false,
        description: false,
        id: false,
        invitationToken: false,
        slug: false,
        title: false,
        updatedAt: false,
      },
    });

    return payload?.lecturerId === lecturerId;
  }
}
