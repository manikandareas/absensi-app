import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn, MutationConfig } from "@/lib/react-query";
import {
  CreateClassPresenceDTO,
  CreateClassPresenceResponse,
} from "@/types/classes";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

export const createClassPresenceService: ApiFn<
  CreateClassPresenceDTO & { classId: string },
  AxiosPromise<CreateClassPresenceResponse>
> = (body) => {
  const { classId, ...dto } = body;
  return axios.post<CreateClassPresenceResponse>(
    ApiRoute.classPresences(classId),
    dto,
  );
};

type MutationFnType = typeof createClassPresenceService;

export const useCreateClassPresenceMutation = (
  config: MutationConfig<MutationFnType> = {},
) => {
  return useMutation({
    mutationFn: (body: CreateClassPresenceDTO & { classId: string }) =>
      createClassPresenceService(body),
    mutationKey: ["create-class-presence"],
    ...config,
  });
};
