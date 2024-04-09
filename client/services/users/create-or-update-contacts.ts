import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn, MutationConfig } from "@/lib/react-query";
import {
  CreateOrUpdateContactsDTO,
  CreateOrUpdateContactsResponse,
} from "@/types/users";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

export const createOrUpdateContactsService: ApiFn<
  CreateOrUpdateContactsDTO,
  AxiosPromise<CreateOrUpdateContactsResponse>
> = (body) => {
  const { userId, ...dto } = body;
  return axios.patch(ApiRoute.userContacts(userId), dto);
};

type MutationFnType = typeof createOrUpdateContactsService;

export const useCreateOrUpdateContactsMutation = (
  config: MutationConfig<MutationFnType> = {},
) => {
  return useMutation({
    mutationFn: (body: CreateOrUpdateContactsDTO) =>
      createOrUpdateContactsService(body),
    mutationKey: ["create-or-update-contacts"],
    ...config,
  });
};
// import { ApiRoute } from "@/lib/api-route";
// import axios from "axios";
// import { SignUpDTO, SignUpResponse } from "@/types/auth";
// import { AxiosPromise } from "axios";
// import { useMutation } from "@tanstack/react-query";
// import { ApiFn, MutationConfig } from "@/lib/react-query";

// export const signUpService: ApiFn<SignUpDTO, AxiosPromise<SignUpResponse>> = (
//   body,
// ) => {
//   return axios.post<SignUpResponse>(ApiRoute.signUp(), body);
// };

// type MutationFnType = typeof signUpService;

// export const useSignUpMutation = (
//   config: MutationConfig<MutationFnType> = {},
// ) => {
//   return useMutation({
//     mutationFn: (body: SignUpDTO) => signUpService(body),
//     mutationKey: ["sign-up"],
//     ...config,
//   });
// };
