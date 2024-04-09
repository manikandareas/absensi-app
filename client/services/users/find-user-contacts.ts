import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn } from "@/lib/react-query";
import { FindUserContactsResponse } from "@/types/users";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";
import { SetOptional } from "type-fest";

export const findUserContactsService: ApiFn<
  string,
  AxiosPromise<FindUserContactsResponse>
> = (userId) => {
  return axios.get(ApiRoute.userContacts(userId));
};

type UseFindUserContactsQuery = {
  userId: string;
  config?: SetOptional<
    UseQueryOptions<
      unknown,
      unknown,
      AxiosResponse<FindUserContactsResponse>,
      any[]
    >,
    "queryKey"
  >;
};

export const useFindUserContactsQuery = ({
  config,
  userId,
}: UseFindUserContactsQuery) => {
  return useQuery({
    queryKey: ["user-contacts", userId],
    queryFn: async () => await findUserContactsService(userId),
    ...config,
  });
};
