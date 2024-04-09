import { IsNotEmpty, IsString } from 'class-validator';

export class JoinClassDto {
  @IsString()
  @IsNotEmpty()
  invitationToken: string;
}
