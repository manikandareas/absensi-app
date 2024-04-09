import { ApiFn } from "@/lib/react-query";
import { PaginationDTO } from "@/types/api";

import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import {
  FindAllUserClassesResponse,
  FindAllUserPresencesResponse,
} from "@/types/users";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";
import { SetOptional } from "type-fest";

export const findAllUserPresencesService: ApiFn<
  { userId: string; paginate?: PaginationDTO },
  AxiosPromise<FindAllUserPresencesResponse>
> = (body) => {
  return axios.get(ApiRoute.userPresences(body.userId), {
    params: body.paginate,
  });
};

type UseFindAllUserPresencesQuery = {
  body: {
    userId: string;
    paginate?: PaginationDTO;
  };
  config?: SetOptional<
    UseQueryOptions<
      unknown,
      unknown,
      AxiosResponse<FindAllUserPresencesResponse>,
      any[]
    >,
    "queryKey"
  >;
};

export const useFindAllUserPresencesQuery = ({
  body,
  config,
}: UseFindAllUserPresencesQuery) => {
  const { userId, paginate } = body;
  return useQuery({
    queryKey: ["user-presences"],
    queryFn: async () =>
      await findAllUserPresencesService({ userId, paginate }),
    ...config,
  });
};
