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
import { cn } from "@/lib/utils";
import {
  FindAllUserPresencesResponse,
  FindUserOverviewResponse,
} from "@/types/users";

export type RecentAttendanceProps = {
  title: string;
  description: string;
  status: "ABSENT" | "PRESENT" | "LATE";
  createdAt: Date;
  href: string;
};
// "default" | "secondary" | "destructive" | "outline"
const badgeColors = {
  ABSENT: "bg-red-500 hover:bg-red-600",
  PRESENT: "bg-green-500 hover:bg-green-600",
  LATE: "bg-yellow-500 hover:bg-yellow-600",
};

const RecentAttendance: React.FC<RecentAttendanceProps> = (props) => {
  const dateIn = props.createdAt.toLocaleDateString();
  const timeIn = props.createdAt.toLocaleTimeString();
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-muted-foreground">{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-3">
        <div className="">
          <p className="text-xs">Status</p>
          <Badge className={cn("text-xs", badgeColors[props.status])}>
            {props.status}
          </Badge>
        </div>
        <div className="hidden sm:block">
          <p className="text-xs">Date</p>
          <span className="text-xs">{dateIn}</span>
        </div>
        <div className="hidden sm:block">
          <p className="text-xs">Time</p>
          <span className="text-sm">{timeIn}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={props.href} className="text-sm text-primary">
          Show Detail
        </Link>
      </CardFooter>
    </Card>
  );
};
export default RecentAttendance;

type RecentAttendancesProps = {
  data: FindUserOverviewResponse["data"];
};
export const RecentAttendances: React.FC<RecentAttendancesProps> = (props) => {
  const data = props.data?.recentAttendances?.map(
    (item) =>
      ({
        title: item.classPresences.class.title,
        description: item.classPresences.class.description,
        createdAt: new Date(item.createdAt!),
        status: item.status,
        href: `/classes/${item.classPresences.class.slug}/presences/${item.classPresences.id}?class-id=${item.classPresences.classId}`,
      }) as RecentAttendanceProps,
  );

  if (!data) return <div>Loading</div>;
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:justify-start lg:flex-nowrap">
      {data.map((item, idx) => (
        <RecentAttendance key={idx} {...item} />
      ))}
    </div>
  );
};
