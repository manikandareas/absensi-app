import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ClassImg from "../ui/ClassImg";
import React from "react";
import PresencesImg from "../ui/PresencesImg";
import IncomingPresenceImg from "../ui/IncomingPresenceImg";
import { FindUserOverviewResponse } from "@/types/users";

const overviewImg = {
  class: <ClassImg />,
  presences: <PresencesImg />,
  incoming: <IncomingPresenceImg />,
};

export type OverviewCardProps = {
  title: string;
  description: string;
  count: number;
  img: keyof typeof overviewImg;
  href: string;
  textLink: string;
};

const OverviewCard: React.FC<OverviewCardProps> = (props) => {
  return (
    <Card className="w-[350px] xl:grow">
      <CardHeader className="flex-row items-center justify-between sm:flex">
        <div>
          <CardTitle className="text-sm text-muted-foreground sm:text-xl">
            {props.title}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {props.description}
          </CardDescription>
        </div>
        <h2 className="text-xl text-secondary-foreground lg:hidden">
          {props.count}
        </h2>
      </CardHeader>
      <CardContent className=" hidden items-center justify-between lg:flex">
        <h2 className="text-6xl font-extrabold text-secondary-foreground">
          {props.count}
        </h2>
        {overviewImg[props.img]}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={props.href} className="text-sm text-primary">
          {props.textLink}
        </Link>
      </CardFooter>
    </Card>
  );
};
export default OverviewCard;

type OverviewCardsProps = {
  data: OverviewCardProps[];
  overview: FindUserOverviewResponse;
};

export const OverviewCards: React.FC<OverviewCardsProps> = (props) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      {props.data.map((item, idx) => (
        <OverviewCard key={idx} {...item} />
      ))}
    </div>
  );
};
