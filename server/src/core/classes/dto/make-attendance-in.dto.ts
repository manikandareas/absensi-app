import { GeolocationDto } from './create-class-presences.dto';
import { IsObject, IsOptional } from 'class-validator';

export class MakeAttendanceInDto {
  @IsObject()
  @IsOptional()
  geolocation: GeolocationDto;
}
