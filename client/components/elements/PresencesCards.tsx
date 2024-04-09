import { intlFormatDistance } from "date-fns";
import { QrCode } from "lucide-react";
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

type PresencesCardProps = {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  lecturerId: string;
  classId: string;
  isSecure: boolean | null;
  geolocation: Geolocation | null;
  expireAt: Date | null;
  toleranceTimes: number | null;
  barcodeId: number | null;
  slug: string;
};
const PresenceCard: React.FC<PresencesCardProps> = (props) => {
  const createdDate = new Date(props.createdAt!).toDateString();
  const expireTime = intlFormatDistance(new Date(props.expireAt!), new Date(), {
    locale: "id-ID",
  });

  return (
    <Link
      href={`/classes/${props.slug}/presences/${props.id}?class-id=${props.classId}`}
    >
      <Card className="relative w-full">
        <CardHeader className="flex-row items-center justify-between sm:flex">
          <div>
            <CardTitle className="text-sm text-muted-foreground sm:text-xl">
              {"Absensi PMI"}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {createdDate}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className=" hidden grid-cols-2 items-center justify-between md:grid">
          <div className="flex flex-col gap-y-1.5">
            <span className="text-xs text-muted-foreground">
              Expire : {expireTime}
            </span>
            <span className="text-xs text-muted-foreground">
              Geolocation : {props.isSecure ? "True" : "False"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="space-x-1.5 text-xs text-muted-foreground ">
          <span>Already absent :</span> <Badge>20</Badge>
        </CardFooter>
        {/* <QrCode
          size={100}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        /> */}
      </Card>
    </Link>
  );
};
export default PresenceCard;

type PresencesCardsProps = {
  data: Omit<PresencesCardProps, "slug">[];
  slug: string;
};
export const PresenceCards: React.FC<PresencesCardsProps> = (props) => {
  return (
    <div className="flex flex-col gap-y-2">
      {props.data.map((item, idx) => (
        <PresenceCard key={idx} slug={props.slug} {...item} />
      ))}
    </div>
  );
};
