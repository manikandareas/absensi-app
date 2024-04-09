import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { CheckAvailabilityDTO, CheckAvailabilityResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const checkAvailabilityService = async (dto: CheckAvailabilityDTO) => {
  const searchParams = new URLSearchParams();

  if (dto.email) searchParams.set("email", dto.email);

  if (dto.id) searchParams.set("universityId", dto.id);

  return await axios.get<CheckAvailabilityResponse>(
    `${ApiRoute.checkAvailability()}?${searchParams.toString()}`,
  );
};

type MutationFnType = typeof checkAvailabilityService;

export const useCheckAvailability = (
  config: MutationConfig<MutationFnType> = {},
) => {
  return useMutation({
    mutationFn: (dto: CheckAvailabilityDTO) => checkAvailabilityService(dto),
    ...config,
  });
};

enum AvailableStatusOptions {
  false = "Already used",
  true = "Available",
}

export const isAvailable = (status: string): boolean => {
  return status === AvailableStatusOptions.true;
};
