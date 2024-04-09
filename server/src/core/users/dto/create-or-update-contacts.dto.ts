import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserContactsDTO {
  @IsString()
  @IsOptional()
  whatsApp: string;

  @IsString()
  @IsOptional()
  telegram: string;

  @IsString()
  @IsOptional()
  numberPhone: string;

  @IsString()
  @IsOptional()
  instagram: string;

  @IsString()
  @IsOptional()
  facebook: string;
}

export class CreateOrUpdateContactsDTO extends PartialType(
  CreateUserContactsDTO,
) {}
