import { IsOptional, IsString, Length } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @Length(3, 40)
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  invitationToken: string;
}
