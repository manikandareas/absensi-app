import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { LecturerGuard } from '../users/guards/lecturer.guard';
import { ApiResponse, UserJwt, classPresenceParams } from '~/lib/types';
import { Request as ReqExpress } from 'express';
import { hasValue } from '~/lib/utils';
import { OwnerClassGuard } from './guards/owner-class.guard';
import { CreateClassPresenceDto } from './dto/create-class-presences.dto';
import { MakeAttendanceInDto } from './dto/make-attendance-in.dto';
import { UpdateClassPresenceDto } from './dto/update-class-presences.dto';
import { StudentGuard } from '../users/guards/student.guard';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard, LecturerGuard)
  async createClass(
    @Body() createClassDto: CreateClassDto,
    @Request() req: ReqExpress,
  ) {
    const user = req['user'] as unknown as UserJwt;
    const payload = await this.classesService.createClass(
      user.id,
      createClassDto,
    );
    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created class',
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async findOneClass(@Param('slug') slug: string) {
    const payload = await this.classesService.findOneClassBySlug(slug);
    return {
      status_code: HttpStatus.OK,
      message: `Success found class by id ${slug}`,
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  @Patch(':classId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, OwnerClassGuard)
  async updateClass(
    @Param('classId') classId: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    if (!hasValue(updateClassDto))
      throw new BadRequestException('No field to update');
    const payload = await this.classesService.updateClass(
      classId,
      updateClassDto,
    );
    return {
      status_code: HttpStatus.OK,
      message: `Successfully updated class with id ${classId}`,
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  @Delete(':classId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, OwnerClassGuard)
  async removeClass(@Param('classId') classId: string) {
    await this.classesService.removeClass(classId);
    return {
      status_code: HttpStatus.OK,
      message: `Successfully deleted class with id ${classId}`,
      data: null,
    } satisfies ApiResponse<null>;
  }

  @Get(':classId/presences')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async findClassPresences(@Param('classId') classId: string) {
    console.log(classId);

    const payload = await this.classesService.findClassPresences(classId);

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully found Class Presences',
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  @Post(':classId/presences')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard, OwnerClassGuard)
  async createClassPresence(
    @Param('classId') classId: string,
    @Body() createClassPresence: CreateClassPresenceDto,
    @Request() req: ReqExpress,
  ) {
    const user = req['user'] as unknown as UserJwt;
    const payload = await this.classesService.createClassPresence(
      user.id,
      classId,
      createClassPresence,
    );

    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created class presence',
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  @Post(':classId/presences/:presencesId')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard, StudentGuard)
  async makeAttendanceIn(
    @Param('presencesId') classPresencesId: string,
    @Request() req: ReqExpress,
    @Body() makeAttendanceInDto: MakeAttendanceInDto,
  ) {
    const user = req['user'] as unknown as UserJwt;

    const payload = await this.classesService.makeAttendanceIn(
      user.id,
      classPresencesId,
      makeAttendanceInDto,
    );
    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully make attendance in',
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  @Get(':classId/presences/:presencesId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async findOneClassPresence(@Param() params: classPresenceParams) {
    const payload = await this.classesService.findOneClassPresence(
      params.classId,
      params.presencesId,
    );
    return {
      status_code: HttpStatus.OK,
      message: 'Successfully found class presence',
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  @Delete(':classId/presences/:presencesId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, OwnerClassGuard)
  async removeClassPresence(@Param() params: classPresenceParams) {
    const payload = await this.classesService.removeClassPresence(
      params.classId,
      params.presencesId,
    );
    return {
      status_code: HttpStatus.OK,
      message: `Successfully deleted class presence with id ${params.presencesId}`,
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  @Patch(':classId/presences/:presencesId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, OwnerClassGuard)
  async updateClassPresence(
    @Param() params: classPresenceParams,
    @Body() updateClassPresenceDto: UpdateClassPresenceDto,
  ) {
    if (!hasValue(updateClassPresenceDto))
      throw new BadRequestException('No field to update');

    const payload = await this.classesService.updateClassPresence(
      params.classId,
      params.presencesId,
      updateClassPresenceDto,
    );

    return {
      status_code: HttpStatus.OK,
      message: `Successfully updated class presence with id ${params.presencesId}`,
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  @Post(':classId/presences/:presencesId/barcodes')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, OwnerClassGuard)
  async createPresenceBarcode(@Param() params: classPresenceParams) {
    const payload = await this.classesService.createPresenceBarcode(
      params.classId,
      params.presencesId,
    );

    return {
      status_code: HttpStatus.OK,
      message: 'Successfully created barcode presence',
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }

  // @Get(':classId/presences/:presencesId/barcodes')
  // findOnePresenceBarcode(@Param() params: string[]) {
  //   return params;
  // }
}
