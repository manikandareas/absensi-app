import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiResponse, CheckAvailabilityQueries } from '~/lib/types';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { Request as RequestExpress } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.create(createUserDto);
    return {
      status_code: HttpStatus.CREATED,
      message: 'Successfully created user',
      data: createdUser,
    } satisfies ApiResponse<typeof createdUser>;
  }

  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
    // return {
    //   status_code: HttpStatus.CREATED,
    //   message: 'Successfully sign-in',
    //   data: payload,
    // } satisfies ApiResponse<typeof payload>;
  }

  @Post('refresh-token')
  @UseGuards(RefreshJwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async refreshToken(@Request() req: RequestExpress) {
    return await this.authService.refreshToken(req['user']);
    // return {
    //   status_code: HttpStatus.CREATED,
    //   message: 'Successfully generated token',
    //   data: payload,
    // } satisfies ApiResponse<typeof payload>;
  }

  @Get('check-availability')
  async checkAvailability(@Query() queries: CheckAvailabilityQueries) {
    const payload = await this.authService.checkAvailability(queries);
    return {
      status_code: HttpStatus.OK,
      message: 'Check availability successfully',
      data: payload,
    } satisfies ApiResponse<typeof payload>;
  }
}
