import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Post,
  NotFoundException,
  BadRequestException,
  ParseUUIDPipe,
  Query,
  Request,
} from '@nestjs/common';
import { Request as ReqExpress } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiResponse, UserJwt } from '~/lib/types';
import { JoinClassDto } from './dto/join-class.dto';
import { hasValue } from '~/lib/utils';
import { PaginationDTO } from '../dto/pagination.dto';
import { UserRole } from '../db/db.schema';
import { CreateOrUpdateContactsDTO } from './dto/create-or-update-contacts.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  // @UseGuards(JwtGuard)
  async findOneById(@Param('id', ParseUUIDPipe) id: string) {
    const payload = await this.usersService.findOneById(id);

    if (!payload || !hasValue(payload))
      throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = payload;
    const response: ApiResponse<typeof user> = {
      status_code: HttpStatus.FOUND,
      message: 'Successfully found user',
      data: user,
    };
    return response;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!hasValue(updateUserDto))
      throw new BadRequestException('No field to update');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.usersService.update(
      id,
      updateUserDto,
    );
    const response: ApiResponse<typeof user> = {
      status_code: HttpStatus.OK,
      message: 'Successfully updated user',
      data: user,
    };
    return response;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async removeUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.removeUser(id);
    const response: ApiResponse<null> = {
      status_code: HttpStatus.OK,
      message: 'Successfully deleted user',
      data: null,
    };
    return response;
  }

  @Get(':id/contacts')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  async findUserContacts(@Param('id', ParseUUIDPipe) id: string) {
    const payload = await this.usersService.findUserContacts(id);

    return {
      status_code: HttpStatus.CREATED,
      data: payload,
      message: "Successfully found user's contacts",
    } satisfies ApiResponse<typeof payload>;
  }

  @Patch(':id/contacts')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  async createOrUpdateContacts(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() contactsDTO: CreateOrUpdateContactsDTO,
  ) {
    const payload = await this.usersService.createOrUpdateContacts(
      id,
      contactsDTO,
    );

    return {
      status_code: HttpStatus.CREATED,
      data: payload,
      message: "Successfully updated user's contacts",
    } satisfies ApiResponse<typeof payload>;
  }
  @Get(':id/overview')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async findUserOverview(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: ReqExpress,
  ) {
    const user = req['user'] as unknown as UserJwt;
    let overview;
    if (user.sub.role === UserRole.LECTURER) {
      overview = await this.usersService.findLectureOverview(id);
    } else {
      overview = await this.usersService.findUserOverview(id);
    }

    const response: ApiResponse<typeof overview> = {
      status_code: HttpStatus.OK,
      message: 'Successfully found user overview',
      data: overview,
    };
    return response;
  }

  @Get(':id/classes')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async findAllUserClasses(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: ReqExpress,
  ) {
    const user = req['user'] as unknown as UserJwt;
    let userClasses;
    if (user.sub.role === UserRole.LECTURER) {
      userClasses = await this.usersService.findAllLectureClasses(id);
    } else {
      userClasses = await this.usersService.findAllUserClasses(id);
    }

    const response: ApiResponse<typeof userClasses> = {
      status_code: HttpStatus.OK,
      message: 'Successfully found classes',
      data: userClasses,
      count: userClasses.length,
    };
    return response;
  }

  @Post(':id/classes')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  async joinClass(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() joinClassDto: JoinClassDto,
  ) {
    const payload = await this.usersService.joinClass(id, joinClassDto);

    const res = {
      ...payload.payload,
      title: payload.classTitle,
    };

    const response: ApiResponse<typeof res> = {
      status_code: HttpStatus.CREATED,
      message: `Successfully joining class`,
      data: res,
    };

    return response;
  }

  @Get(':id/user-presences')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async findAllUserPresences(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() paginate: PaginationDTO,
  ) {
    const userPresences = await this.usersService.findAllUserPresences(
      id,
      paginate,
    );
    const response: ApiResponse<typeof userPresences.data> = {
      status_code: HttpStatus.OK,
      message: 'Successfully found user presences',
      data: userPresences.data,
      meta: userPresences.meta,
    };
    return response;
  }

  @Get(':id/ongoing-presences')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async findAllOngoingUserPresences(@Param('id', ParseUUIDPipe) id: string) {
    const payload = await this.usersService.findAllOngoingUserPresences(id);

    return {
      status_code: HttpStatus.OK,
      data: payload,
      message: 'Successfully found ongoing presences',
    } satisfies ApiResponse<typeof payload>;
  }
}
