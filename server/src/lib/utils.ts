import { Geolocation } from '~/core/db/db.schema';
import { getPreciseDistance } from 'geolib';

export const hasValue = (obj: object): boolean => {
  for (const key in obj) {
    // @ts-expect-error unknown error
    if (obj[key] !== undefined && obj[key] !== null) {
      return true;
    }
  }
  return false;
};

export const isIncludeInArea = (
  x: Geolocation,
  y: Geolocation,
  metersTolerance: number,
): boolean => {
  const distance = getPreciseDistance(x, y, 1);
  return distance < metersTolerance;
};
