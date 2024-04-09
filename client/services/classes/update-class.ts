import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn, MutationConfig } from "@/lib/react-query";
import { UpdateClassDTO, UpdateClassResponse } from "@/types/classes";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

export const updateClassService: ApiFn<
  UpdateClassDTO & { classId: string },
  AxiosPromise<UpdateClassResponse>
> = (body) => {
  const { classId, ...dto } = body;
  return axios.patch<UpdateClassResponse>(ApiRoute.classBySlug(classId), dto);
};

type MutationFnType = typeof updateClassService;

export const useUpdateClassMutation = (
  config: MutationConfig<MutationFnType> = {},
) => {
  return useMutation({
    mutationFn: (dto: UpdateClassDTO & { classId: string }) =>
      updateClassService(dto),
    ...config,
  });
};
