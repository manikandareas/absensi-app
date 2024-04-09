import { ApiResponse } from "./api";

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

export type SignInResponse = ApiResponse<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}>;

export type SignUpResponse = ApiResponse<{
  id: string;
  name: string;
  universityId: string | null;
  email: string;
  role: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}>;

export type CheckAvailabilityResponse = ApiResponse<
  {
    field: string;
    status: string;
  }[]
>;

export type SignInDTO = {
  email: string;
  password: string;
};

export type SignUpDTO = {
  universityId: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type CheckAvailabilityDTO = {
  id?: string;
  email?: string;
};

export type User = {
  id: string;
  name: string;
  universityId: string | null;
  email: string;
  role: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export enum UserRole {
  LECTURER = "LECTURER",
  STUDENT = "STUDENT",
}

export type UserFromStorage = {
  id: string;
  name: string;
  universityId: string;
  email: string;
  role: "STUDENT" | "LECTURER"; // Assuming roles are limited to STUDENT and LECTURER
  createdAt: string; // Assuming it's a string representation of a date
  updatedAt: string; // Assuming it's a string representation of a date
};

type BackendTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // Assuming it's a Unix timestamp in milliseconds
};

type State = {
  user: UserFromStorage;
  backendTokens: BackendTokens;
};

export type AuthStorage = {
  state: State;
  version: number;
};

// Now you can access properties using type-safe dot notation
