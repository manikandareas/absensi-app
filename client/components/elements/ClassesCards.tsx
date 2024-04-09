"use client";
import { useFindAllUserClassesQUery } from "@/services/users/find-user-classes";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ClassesCardsLoading from "./ClassesCardLoading";

export type ClassesCardProps = {
  title: string;
  description: string;
  lecturer: {
    name: string;
    email: string;
    universityId: string;
  };
  slug: string;
};

const ClassesCard: React.FC<ClassesCardProps> = (props) => {
  return (
    <Card className="flex-grow  md:w-[320px]">
      <CardHeader>
        <CardTitle className="text-muted-foreground">{props.title}</CardTitle>
        <CardDescription>{props.lecturer.name}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <p>{props.description}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/classes/${props.slug}`}
          className="flex items-center gap-x-2 text-sm text-primary"
        >
          <LinkIcon size={20} />
          <span>Show Detail</span>
        </Link>
      </CardFooter>
    </Card>
  );
};
export default ClassesCard;

type ClassesCardsProps = {
  userId: string;
};
export const ClassesCards: React.FC<ClassesCardsProps> = (props) => {
  const { isLoading, data } = useFindAllUserClassesQUery({
    userId: props.userId,
  });

  if (!data?.data.data || isLoading) return <ClassesCardsLoading />;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {!data.data.data?.length
        ? "You don't have any classes yet"
        : data?.data.data.map((item) => (
            <ClassesCard key={item.id} {...item} />
          ))}
    </div>
  );
};
