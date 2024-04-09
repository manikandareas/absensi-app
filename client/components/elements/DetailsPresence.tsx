"use client";
import { useCreatePresenceBarcodeMutation } from "@/services/classes/create-barcode";
import { useFindClassPresenceQuery } from "@/services/classes/find-class-presence";
import { useMakeAttendanceInMutation } from "@/services/classes/make-attendance-in";
import { differenceInMinutes, intlFormatDistance } from "date-fns";
import { Earth, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGeolocated } from "react-geolocated";
import { toast } from "sonner";
import { queryClient } from "../providers/react-query";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { ListPresencesTable } from "./ListPresencesTable";
import SpecialComponent from "./SpecialComponent";

type DetailsPresenceProps = {
  slug: string;
  presenceId: string;
  userId: string;
};

const DetailsPresence: React.FC<DetailsPresenceProps> = (props) => {
  const searchParams = useSearchParams();
  const { isGeolocationEnabled, isGeolocationAvailable, coords } =
    useGeolocated();

  const { data, isLoading } = useFindClassPresenceQuery({
    classId: searchParams.get("class-id")!,
    presenceId: props.presenceId,
  });

  const textMessage = `Hi, this is a message from your lecture.\nI want to inform you that you should be present in this class ${data?.data.data?.class.title}.\nPlease visit the link below to see more details.\n${window.location.href}`;

  const {
    mutateAsync: mutateAttendanceInAsync,
    isPending: isAttendanceInPending,
  } = useMakeAttendanceInMutation({
    onError: (error) => {
      const response = error.response?.data as unknown as { message: string };
      toast.error(response.message as unknown as string);
    },
    onSuccess: () => {
      toast.success("Yeayy attendance in success");
      queryClient.invalidateQueries({
        queryKey: [
          "class-presence",
          searchParams.get("class-id"),
          props.presenceId,
        ],
      });
    },
  });

  const { mutateAsync, isPending } = useCreatePresenceBarcodeMutation({
    onSuccess: () => {
      toast.success("Success generated barcode");
      queryClient.invalidateQueries({
        queryKey: [
          "class-presence",
          searchParams.get("class-id")!,
          props.presenceId,
        ],
      });
    },
    onError: () => {
      toast.error("Failed generated barcode", {
        description: "Please try again",
      });
    },
  });

  if (isLoading) return <Skeleton className="h-40 w-full rounded-lg" />;

  const createdDate = new Date(data?.data.data!.createdAt!).toDateString();
  const expireTime = intlFormatDistance(
    new Date(data?.data.data!.expireAt!),
    new Date(),
    {
      locale: "id-ID",
    },
  );

  const handleBtnCreateBarcode = async () => {
    await mutateAsync({
      classId: searchParams.get("class-id")!,
      presencesId: props.presenceId,
    });
  };

  const handleStudentAbsentIn = async () => {
    await mutateAttendanceInAsync({
      classId: searchParams.get("class-id")!,
      presenceId: props.presenceId,
      geolocation: {
        latitude: coords?.latitude!,
        longitude: coords?.longitude!,
      },
    });
  };
  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{data?.data.data?.class.title}</CardTitle>
          <CardDescription>
            {data?.data.data?.class.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="space-y-3">
            <div className="">
              <span className="text-xs font-medium text-muted-foreground">
                Lecturer
              </span>
              <h1 className="font-semibold">
                {data?.data.data?.lecturer.name}
              </h1>
            </div>
            <div className="">
              <span className="text-xs font-medium text-muted-foreground">
                Created-At
              </span>
              <h1 className="font-semibold">{createdDate}</h1>
            </div>

            {!data?.data.data?.isSecure ? null : (
              <div className="">
                <span className="text-xs font-medium text-muted-foreground">
                  Location Presence
                </span>
                <Link
                  href={`https://www.google.com/maps?q=${data?.data.data?.geolocation?.latitude},${data?.data.data?.geolocation?.longitude}`}
                  className="flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  <Earth size={20} /> <span>Goto maps</span>
                </Link>
              </div>
            )}

            <div>
              <span className="text-xs font-medium text-muted-foreground">
                Expire :
              </span>
              <h1 className="text-sm font-semibold">{expireTime}</h1>
            </div>

            <div>
              <span className="text-xs font-medium text-muted-foreground">
                Status Presence
              </span>
              <Badge
                className="block w-fit"
                variant={
                  differenceInMinutes(new Date(), data?.data.data?.expireAt!) >
                  0
                    ? "destructive"
                    : "default"
                }
              >
                {differenceInMinutes(new Date(), data?.data.data?.expireAt!) > 0
                  ? "Closed"
                  : "Open"}
              </Badge>
            </div>
          </div>

          <SpecialComponent
            lectureComponent={
              <div className="flex flex-col items-start space-y-1.5">
                <span className=" text-xs font-medium text-muted-foreground">
                  Qr Code
                </span>
                {!data?.data.data?.barcode ? (
                  <Button
                    className="w-fit"
                    variant={"outline"}
                    onClick={handleBtnCreateBarcode}
                    disabled={isPending}
                  >
                    {isPending ? "Creating..." : "Create Qr Code"}
                  </Button>
                ) : (
                  // <QrCode size={200} />
                  <Image
                    width={200}
                    height={200}
                    alt="Qr Code"
                    className="rounded-lg"
                    src={data?.data.data?.barcode.url}
                  />
                )}
                <Button
                  variant={"link"}
                  size={"sm"}
                  onClick={() => {
                    navigator.clipboard.writeText(textMessage);
                    toast.success("Success copy link");
                  }}
                >
                  Copy Link
                </Button>
              </div>
            }
            studentComponent={
              <div className="flex flex-col space-y-1.5">
                <span className=" text-xs font-medium text-muted-foreground">
                  Action
                </span>
                <Button
                  className="w-fit"
                  type="button"
                  onClick={handleStudentAbsentIn}
                  disabled={
                    isAttendanceInPending ||
                    (data?.data.data?.isSecure! && !isGeolocationEnabled) ||
                    data?.data.data?.userPresences.some(
                      (x) => x.user.id === props.userId,
                    )
                  }
                >
                  {isAttendanceInPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Absent now"
                  )}
                </Button>
              </div>
            }
          />
        </CardContent>
      </Card>
      {!data?.data.data ? (
        <p>No students make presence yet</p>
      ) : (
        <ListPresencesTable
          presences={data?.data.data.userPresences.map((item) => ({
            id: item.id,
            status: item.status,
            createdAt: item.createdAt,
            userId: item.user.id,
            name: item.user.name,
          }))}
        />
      )}
    </div>
  );
};
export default DetailsPresence;
