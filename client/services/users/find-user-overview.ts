import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn } from "@/lib/react-query";
import {
  FindAllUserClassesResponse,
  FindUserOverviewResponse,
} from "@/types/users";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";
import { SetOptional } from "type-fest";

export const findUserOverviewService: ApiFn<
  string,
  AxiosPromise<FindUserOverviewResponse>
> = (userId) => {
  return axios.get(ApiRoute.userOverview(userId));
};

type UseFindUserOverviewQuery = {
  userId: string;
  config?: SetOptional<
    UseQueryOptions<
      unknown,
      unknown,
      AxiosResponse<FindUserOverviewResponse>,
      any[]
    >,
    "queryKey"
  >;
};

export const useFindUserOverviewQuery = ({
  userId,
  config,
}: UseFindUserOverviewQuery) => {
  return useQuery({
    queryFn: async () => await findUserOverviewService(userId),
    queryKey: ["user-overview", userId],
    ...config,
  });
};
