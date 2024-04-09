import { ApiResponse } from "./api";
import { FindOneClassPresence, GeolocationDTO } from "./classes";

export type FindAllUserClassesResponse = ApiResponse<
  {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    title: string;
    description: string;
    lecturerId: string;
    slug: string;
    invitationToken: string;
    lecturer: {
      name: string;
      email: string;
      universityId: string;
    };
  }[]
>;

export type JoinClassResponse = ApiResponse<{
  id: number;
  classId: string;
  userId: string;
  title: string;
}>;

export type FindUserOverviewResponse = ApiResponse<{
  classesCount: number;
  presencesCount: number;
  recentAttendances?: {
    id: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string;
    status: string;
    geolocation: GeolocationDTO | null;
    message: string | null;
    classPresencesId: string;
    classPresences: {
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
      lecturer: {
        id: string;
        name: string;
        email: string;
        universityId: string;
      };
    };
  }[];
  recentClassPresences?: {
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
  }[];
}>;

export type CreateOrUpdateContactsDTO = {
  whatsApp?: string;

  telegram?: string;

  numberPhone?: string;

  instagram?: string;

  facebook?: string;
  userId: string;
};

export type CreateOrUpdateContactsResponse = ApiResponse<{
  id: number;
  whatsApp: string | null;
  telegram: string | null;
  numberPhone: string | null;
  instagram: string | null;
  facebook: string | null;
  userId: string;
}>;

export type FindUserContactsResponse = ApiResponse<{
  id: number;
  whatsApp: string | null;
  telegram: string | null;
  numberPhone: string | null;
  instagram: string | null;
  facebook: string | null;
  userId: string;
  user: {
    id: string;
    name: string;
    universityId: string | null;
    email: string;
    password: string;
    role: string;
    contactsId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
}>;

export type FindAllUserPresencesResponse = ApiResponse<
  {
    id: number;
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    status: string;
    geolocation: GeolocationDTO | null;
    message: string | null;
    classPresencesId: string;
    classPresences: {
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
    };
  }[]
>;

export type FindUserOngoingPresenceResponse = {
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
};

export type FindUserOngoingPresencesResponse = ApiResponse<
  FindUserOngoingPresenceResponse[]
>;

export type UpdateUserDto = Partial<{
  universityId: string;
  name: string;
  email: string;
}>;

export type UpdateUserResponse = ApiResponse<{
  id: string;
  name: string;
  universityId: string | null;
  email: string;
  role: string;
  contactsId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}>;
