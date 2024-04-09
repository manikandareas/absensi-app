import { ApiRoute } from "@/lib/api-route";
import { axios } from "@/lib/axios";
import { ApiFn, MutationConfig } from "@/lib/react-query";
import { MakeAttendanceInDTO, MakeAttendanceInResponse } from "@/types/classes";
import { useMutation } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

export const makeAttendanceInService: ApiFn<
  MakeAttendanceInDTO & { classId: string; presenceId: string },
  AxiosPromise<MakeAttendanceInResponse>
> = (body) => {
  const { classId, presenceId, ...dto } = body;
  return axios.post(ApiRoute.classPresenceById(classId, presenceId), dto);
};

type MutationFnType = typeof makeAttendanceInService;

export const useMakeAttendanceInMutation = (
  config: MutationConfig<MutationFnType> = {},
) => {
  return useMutation({
    mutationFn: (
      body: MakeAttendanceInDTO & { classId: string; presenceId: string },
    ) => makeAttendanceInService(body),
    mutationKey: ["make-attendance-in"],
    ...config,
  });
};
