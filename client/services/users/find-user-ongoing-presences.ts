import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn } from "@/lib/react-query";
import { FindUserOngoingPresencesResponse } from "@/types/users";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";
import { SetOptional } from "type-fest";

export const findUserOngoingPresencesService: ApiFn<
  string,
  AxiosPromise<FindUserOngoingPresencesResponse>
> = (body) => {
  return axios.get(ApiRoute.userOngoingPresences(body));
};

type UseFindUserOngoingPresencesQuery = {
  userId: string;
  config?: SetOptional<
    UseQueryOptions<
      unknown,
      unknown,
      AxiosResponse<FindUserOngoingPresencesResponse>,
      any[]
    >,
    "queryKey"
  >;
};

export const useFindUserOngoingPresencesQuery = ({
  userId,
  config,
}: UseFindUserOngoingPresencesQuery) => {
  return useQuery({
    queryKey: ["ongoing-presences"],
    queryFn: async () => await findUserOngoingPresencesService(userId),
    ...config,
  });
};
