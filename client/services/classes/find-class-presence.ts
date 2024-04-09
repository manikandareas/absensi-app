import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn } from "@/lib/react-query";
import { FindOneClassPresence } from "@/types/classes";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";
import { SetOptional } from "type-fest";

const findClassPresenceService: ApiFn<
  { classId: string; presenceId: string },
  AxiosPromise<FindOneClassPresence>
> = ({ classId, presenceId }) => {
  return axios.get(ApiRoute.classPresenceById(classId, presenceId));
};

type UseFindClassPresenceQuery = {
  classId: string;
  presenceId: string;
  config?: SetOptional<
    UseQueryOptions<
      unknown,
      unknown,
      AxiosResponse<FindOneClassPresence>,
      any[]
    >,
    "queryKey"
  >;
};

export const useFindClassPresenceQuery = ({
  classId,
  presenceId,
  config,
}: UseFindClassPresenceQuery) => {
  return useQuery({
    queryKey: ["class-presence", classId, presenceId],
    queryFn: async () =>
      await findClassPresenceService({ classId, presenceId }),
    ...config,
  });
};
