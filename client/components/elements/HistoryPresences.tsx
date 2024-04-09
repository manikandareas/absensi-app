"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { FindAllUserPresencesResponse } from "@/types/users";
import { GeolocationDTO } from "@/types/classes";
import { useFindAllUserPresencesQuery } from "@/services/users/find-all-user-presences";

type HistoryPresenceProps = {
  id: number;
  userId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  status: string;
  geolocation: GeolocationDTO | null;
  message: string | null;
  classPresencesId: string;
  classPresences: {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    lecturerId: string;
    classId: string;
    isSecure: boolean | null;
    geolocation: GeolocationDTO | null;
    expireAt: Date | null;
    toleranceTimes: number | null;
    barcodeId: number | null;
    class: {
      id: string;
      createdAt: string;
      updatedAt: Date | null;
      title: string;
      description: string | null;
      lecturerId: string;
      slug: string | null;
      invitationToken: string | null;
    };
  };
};
const HistoryPresence: React.FC<HistoryPresenceProps> = (props) => {
  const createdDate = new Date(props.classPresences.createdAt!).toDateString();
  const absentIn = new Date(props.createdAt!).toDateString();
  return (
    <Link
      href={`/classes/${props.classPresences.class.slug}/presences/${props.classPresences.id}?class-id=${props.classPresences.classId}`}
    >
      <Card className="relative w-full">
        <CardHeader className="flex-row items-center justify-between sm:flex">
          <div>
            <CardTitle className="text-sm text-muted-foreground sm:text-xl">
              {props.classPresences.class.title}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {props.classPresences.class.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className=" hidden grid-cols-2 items-center justify-between md:grid">
          <div className="flex flex-col gap-y-1.5">
            <span className="text-xs text-muted-foreground">
              Created-at: {createdDate}
            </span>
            <span className="text-xs text-muted-foreground">
              Absent in : {absentIn}
            </span>
          </div>
        </CardContent>
        <CardFooter className="space-x-1.5 text-xs text-muted-foreground ">
          <span>Your status :</span>{" "}
          <Badge
            className=""
            variant={props.status === "PRESENT" ? "default" : "destructive"}
          >
            {props.status}
          </Badge>
        </CardFooter>
        {/* <QrCode
        size={100}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      /> */}
      </Card>
    </Link>
  );
};
export default HistoryPresence;

type HistoryPresencesProps = {
  userId: string;
};
export const HistoryPresences: React.FC<HistoryPresencesProps> = (props) => {
  const { data, isLoading, isSuccess } = useFindAllUserPresencesQuery({
    body: { userId: props.userId },
  });

  if (!data?.data.data || isLoading) return <div>Loading</div>;
  return (
    <div className="flex flex-col gap-y-2">
      {isSuccess && !data.data.data.length ? (
        <p className="text-xs text-muted-foreground">
          You don&apos;t have any history presence
        </p>
      ) : (
        data.data.data.map((item) => (
          <HistoryPresence {...item} key={crypto.randomUUID()} />
        ))
      )}
    </div>
  );
};
