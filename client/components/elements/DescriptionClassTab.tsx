"use client";
import { cn } from "@/lib/utils";
import { useFindClassQuery } from "@/services/classes/find-class";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TabsContent } from "../ui/tabs";
import EyePassword from "./EyePassword";
import SpecialComponent from "./SpecialComponent";
import UpdateClassSheet from "./UpdateClassSheet";
import { Skeleton } from "../ui/skeleton";

type DescriptionClassTabProps = {
  slug: string;
};

const DescriptionClassTab: React.FC<DescriptionClassTabProps> = (props) => {
  const { data, isLoading } = useFindClassQuery({ slug: props.slug });

  return (
    <TabsContent value="details">
      {!data?.data.data || isLoading ? (
        <Skeleton className="mt-2 h-32 w-full rounded-lg" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{data.data.data.title}</CardTitle>
            <CardDescription>{data.data.data.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="">
              <span className="text-xs font-medium text-muted-foreground">
                Lecturer
              </span>
              <Link href={`/users/${data.data.data.lecturerId}`}>
                <h1 className="font-semibold underline">
                  {data.data.data.lecturer.name}
                </h1>
              </Link>
            </div>

            <div className="">
              <span className="text-xs font-medium text-muted-foreground">
                Slug
              </span>
              <h1 className="font-semibold">{data.data.data.slug}</h1>
            </div>
            <div className="">
              <span className="text-xs font-medium text-muted-foreground">
                University Id
              </span>
              <h1 className="font-semibold">
                {data.data.data.lecturer.universityId}
              </h1>
            </div>
            <div className="">
              <span className="text-xs font-medium text-muted-foreground">
                Total Students
              </span>
              <h1 className="font-semibold">
                {data.data.data.studentsCount ?? 0}
              </h1>
            </div>

            <div className="">
              <span className="text-xs font-medium text-muted-foreground">
                Created-At
              </span>
              <h1 className="font-semibold">
                {new Date(data.data.data.createdAt ?? 0).toDateString()}
              </h1>
            </div>
            <div className="">
              <span className="text-xs font-medium text-muted-foreground">
                Invitation Token
              </span>
              <EyePassword
                placeholder="********"
                defaultValue={data.data.data.invitationToken ?? ""}
                disabled
              />
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <Link
              href={"https://wa.me/6285171227008"}
              className={cn(buttonVariants())}
            >
              Contact Lecturer
            </Link>
            <SpecialComponent
              lectureComponent={
                <div>
                  <UpdateClassSheet />
                  <Button
                    className="text-sm text-red-500"
                    variant={"ghost"}
                    disabled
                  >
                    Delete Class
                  </Button>
                </div>
              }
              studentComponent={
                <Button variant={"destructive"} disabled>
                  Leave Class
                </Button>
              }
            />
          </CardFooter>
        </Card>
      )}
    </TabsContent>
  );
};
export default DescriptionClassTab;
