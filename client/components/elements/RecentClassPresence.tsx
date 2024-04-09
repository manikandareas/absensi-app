import { cn } from "@/lib/utils";
import { FindUserOverviewResponse } from "@/types/users";
import { intlFormatDistance } from "date-fns";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type RecentClassPresenceProps = {
  id: string;
  createdAt: Date | null;
  classId: string;
  isSecure: boolean | null;
  expireAt: Date | null;
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
  //   user: User;
};

// "default" | "secondary" | "destructive" | "outline"
const badgeColors = {
  Absent: "bg-red-500 hover:bg-red-600",
  Present: "bg-green-500 hover:bg-green-600",
  Late: "bg-yellow-500 hover:bg-yellow-600",
};

const RecentClassPresence: React.FC<RecentClassPresenceProps> = (props) => {
  const date = new Date(props.createdAt!).toDateString();
  const expireTime = intlFormatDistance(
    new Date(props.expireAt!),
    new Date(),
    {},
  );
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-muted-foreground">
          {props.class.title}
        </CardTitle>
        <CardDescription>{props.class.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 space-y-2">
        <div className="">
          <p className="text-xs text-muted-foreground">Status</p>
          <Badge className={cn("text-xs", badgeColors["Absent"])}>Closed</Badge>
        </div>
        <div className="">
          <p className="text-xs text-muted-foreground">Date</p>
          <span className="text-xs">{date}</span>
        </div>
        <div className="">
          <p className="text-xs text-muted-foreground">Expire Time</p>
          <span className="text-xs">{expireTime}</span>
        </div>
        {/* <div className="">
          <p className="text-xs text-muted-foreground">Total Absent</p>
          <span className="text-xs">{props.}</span>
        </div> */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href={`/classes/${props.class.slug}/presences/${props.id}?class-id=${props.classId}`}
          className="text-sm text-primary"
        >
          Show Detail
        </Link>
      </CardFooter>
    </Card>
  );
};
export default RecentClassPresence;

type RecentClassPresencesProps = {
  data: FindUserOverviewResponse["data"];
  //   user: User
};
export const RecentClassPresences: React.FC<RecentClassPresencesProps> = (
  props,
) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:justify-start lg:flex-nowrap">
      {props.data?.recentClassPresences?.map((item, idx) => (
        <RecentClassPresence key={idx} {...item} />
      ))}
    </div>
  );
};
