import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';

export class GeolocationDto {
  @IsLatitude()
  latitude: number;
  @IsLongitude()
  longitude: number;
}

export class CreateClassPresenceDto {
  @IsBoolean()
  isSecure: boolean;

  @IsObject()
  @IsOptional()
  geolocation: GeolocationDto;

  @IsNumber()
  expireMinutes: number;

  @IsNumber()
  @IsOptional()
  toleranceTimes: number;
}
