import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn, MutationConfig } from "@/lib/react-query";
import { JoinClassResponse } from "@/types/users";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

export const joinClassService: ApiFn<
  { userId: string; invitationToken: string },
  AxiosPromise<JoinClassResponse>
> = ({ invitationToken, userId }) => {
  return axios.post(ApiRoute.usersClasses(userId), { invitationToken });
};

type MutationFnType = typeof joinClassService;

export const useJoinClassMutation = (
  config: MutationConfig<MutationFnType> = {},
) => {
  return useMutation({
    mutationFn: (body: { userId: string; invitationToken: string }) =>
      joinClassService(body),
    mutationKey: ["join-class"],
    ...config,
  });
};
