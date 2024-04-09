import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateClassPresenceDto } from './create-class-presences.dto';

export class UpdateClassPresenceDto extends PartialType(
  OmitType(CreateClassPresenceDto, ['expireMinutes' as const]),
) {}
