import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn } from "@/lib/react-query";
import { FindAllClassPresencesResponse } from "@/types/classes";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";
import { SetOptional } from "type-fest";

export const findClassPresencesService: ApiFn<
  string,
  AxiosPromise<FindAllClassPresencesResponse>
> = (classId) => {
  return axios.get(ApiRoute.classPresences(classId));
};

type UseFindClassPresencesQuery = {
  classId: string;
  config?: SetOptional<
    UseQueryOptions<
      unknown,
      unknown,
      AxiosResponse<FindAllClassPresencesResponse>,
      any[]
    >,
    "queryKey"
  >;
};

export const useFindClassPresencesQuery = ({
  classId,
  config,
}: UseFindClassPresencesQuery) => {
  return useQuery({
    queryKey: ["class-presences", classId],
    queryFn: async () => await findClassPresencesService(classId),
    ...config,
  });
};
