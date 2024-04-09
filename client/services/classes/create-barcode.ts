import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn, MutationConfig } from "@/lib/react-query";
import {
  CreatePresenceBarcodeDTO,
  CreatePresenceBarcodeResponse,
} from "@/types/classes";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

export const createPresenceBarcodeService: ApiFn<
  CreatePresenceBarcodeDTO,
  AxiosPromise<CreatePresenceBarcodeResponse>
> = (body) => {
  return axios.post(
    ApiRoute.generatePresenceBarcode(body.classId, body.presencesId),
  );
};

type MutationFnType = typeof createPresenceBarcodeService;

export const useCreatePresenceBarcodeMutation = (
  config: MutationConfig<MutationFnType> = {},
) => {
  return useMutation({
    mutationFn: (body: CreatePresenceBarcodeDTO) =>
      createPresenceBarcodeService(body),
    mutationKey: ["create-presence-barcode"],
    ...config,
  });
};
