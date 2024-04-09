import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn, MutationConfig } from "@/lib/react-query";
import { CreateClassDTO, CreateClassResponse } from "@/types/classes";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

export const createClassService: ApiFn<
  CreateClassDTO,
  AxiosPromise<CreateClassResponse>
> = (body) => {
  return axios.post<CreateClassResponse>(ApiRoute.classes(), body);
};

type MutationFnType = typeof createClassService;

export const useCreateClassMutation = (
  config: MutationConfig<MutationFnType> = {},
) => {
  return useMutation({
    mutationFn: (body: CreateClassDTO) => createClassService(body),
    mutationKey: ["create-class"],
    ...config,
  });
};
