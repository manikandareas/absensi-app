import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn } from "@/lib/react-query";
import { FindAllUserClassesResponse } from "@/types/users";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";
import { SetOptional } from "type-fest";

export const findAllUserClassesService: ApiFn<
  { userId: string },
  AxiosPromise<FindAllUserClassesResponse>
> = ({ userId }) => {
  return axios.get(ApiRoute.usersClasses(userId));
};

type UseFindAllUserClassesQuery = {
  userId: string;
  config?: SetOptional<
    UseQueryOptions<
      unknown,
      unknown,
      AxiosResponse<FindAllUserClassesResponse>,
      any[]
    >,
    "queryKey"
  >;
};

export const useFindAllUserClassesQUery = ({
  config,
  userId,
}: UseFindAllUserClassesQuery) => {
  return useQuery({
    queryKey: ["user-classes"],
    queryFn: async () => await findAllUserClassesService({ userId }),
    ...config,
  });
};
