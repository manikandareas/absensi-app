import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn, MutationConfig } from "@/lib/react-query";
import { UpdateUserDto, UpdateUserResponse } from "@/types/users";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

export const updateUserService: ApiFn<
  { userId: string; body: UpdateUserDto },
  AxiosPromise<UpdateUserResponse>
> = ({ body, userId }) => {
  return axios.patch(ApiRoute.usersById(userId), body);
};

type MutationFnType = typeof updateUserService;

export const useUpdateUserMutation = (
  config: MutationConfig<MutationFnType> = {},
) => {
  return useMutation({
    mutationFn: ({ body, userId }: { body: UpdateUserDto; userId: string }) =>
      updateUserService({ body, userId }),
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
