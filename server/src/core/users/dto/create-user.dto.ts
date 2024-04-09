import { UserRole } from '~/core/db/db.schema';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
export class CreateUserDto {
  @Length(3, 15)
  @IsString()
  @IsOptional()
  universityId: string;

  @Length(3)
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Length(8)
  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
