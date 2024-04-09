import { ApiResponse } from "@/types/api";

export type CreateClassResponse = ApiResponse<{
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  title: string;
  description: string | null;
  lecturerId: string;
  slug: string | null;
  invitationToken: string | null;
}>;

export type CreateClassDTO = {
  title: string;
  description: string;
  slug?: string;
  invitationToken?: string;
};

export type UpdateClassDTO = Partial<CreateClassDTO>;

export type UpdateClassResponse = ApiResponse<{
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  title: string;
  description: string | null;
  lecturerId: string;
  slug: string | null;
  invitationToken: string | null;
}>;

export type FindClassResponse = ApiResponse<{
  id: string;
  createdAt: string;
  studentsCount: number;
  updatedAt: Date | null;
  title: string;
  description: string | null;
  lecturerId: string;
  slug: string | null;
  invitationToken: string | null;
  lecturer: {
    id: string;
    name: string;
    email: string;
    universityId: string;
  };
  students: {
    name: string;
    universityId: string | null;
    email: string;
  }[];
}>;

export type DeleteClassResponse = ApiResponse<null>;

export type FindAllClassPresencesResponse = ApiResponse<
  {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    lecturerId: string;
    classId: string;
    isSecure: boolean | null;
    geolocation: Geolocation | null;
    expireAt: Date | null;
    toleranceTimes: number | null;
    barcodeId: number | null;
  }[]
>;

export type CreateClassPresenceDTO = {
  isSecure: boolean;
  geolocation?: GeolocationDTO;
  expireMinutes: number;
  toleranceTimes: number;
};

export type GeolocationDTO = {
  latitude: number;
  longitude: number;
};

export type CreateClassPresenceResponse = ApiResponse<{
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  lecturerId: string;
  classId: string;
  isSecure: boolean | null;
  geolocation: GeolocationDTO | null;
  expireAt: Date | null;
  toleranceTimes: number | null;
  barcodeId: number | null;
}>;

export type MakeAttendanceInDTO = {
  geolocation?: GeolocationDTO;
};

export type MakeAttendanceInResponse = ApiResponse<{
  geolocation: GeolocationDTO | null;
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
  status: string | null;
  message: string | null;
  classPresencesId: string;
}>;

export type CreatePresenceBarcodeResponse = ApiResponse<{
  barcodeUrl: string;
  id: string;
  isSecure: boolean | null;
  geolocation: Geolocation | null;
  expireAt: Date | null;
  toleranceTimes: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  lecturerId: string;
  classId: string;
  barcodeId: number | null;
}>;

export type CreatePresenceBarcodeDTO = {
  classId: string;
  presencesId: string;
};

export type FindOneClassPresence = ApiResponse<{
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  lecturerId: string;
  classId: string;
  isSecure: boolean | null;
  geolocation: GeolocationDTO | null;
  expireAt: Date | null;
  toleranceTimes: number | null;
  barcodeId: number | null;
  barcode: {
    id: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    url: string;
    stringUrl: string;
  } | null;
  lecturer: {
    id: string;
    name: string;
    email: string;
    universityId: string;
  };
  class: {
    id: string;
    createdAt: string;
    updatedAt: Date | null;
    title: string;
    description: string | null;
    lecturerId: string;
    slug: string | null;
    invitationToken: string | null;
  };
  userPresences: {
    id: string;
    status: string;
    createdAt: Date;
    geolocation?: GeolocationDTO;
    message: string;
    user: {
      id: string;
      name: string;
      email: string;
      universityId: string;
    };
  }[];
}>;
