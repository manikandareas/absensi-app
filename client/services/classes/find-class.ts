import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn } from "@/lib/react-query";
import { FindClassResponse } from "@/types/classes";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";
import { SetOptional } from "type-fest";

export const findClassService: ApiFn<
  string,
  AxiosPromise<FindClassResponse>
> = (slug) => {
  return axios.get(ApiRoute.classBySlug(slug));
};

type UseFindClassQuery = {
  slug: string;
  config?: SetOptional<
    UseQueryOptions<unknown, unknown, AxiosResponse<FindClassResponse>, any[]>,
    "queryKey"
  >;
};

export const useFindClassQuery = ({ slug, config }: UseFindClassQuery) => {
  return useQuery({
    queryKey: ["class", slug],
    queryFn: async () => await findClassService(slug),
    ...config,
  });
};
