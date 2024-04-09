export type ApiResponse<TData> = {
  status_code: number;
  message: string;
  data: TData;
  count?: number;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

export type CheckAvailabilityQueries = { email: string; universityId: string };

export type UserJwt = {
  id: string;
  sub: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
};

export type classPresenceParams = {
  classId: string;
  presencesId: string;
};
