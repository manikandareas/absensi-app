"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import DescriptionClassTab from "./DescriptionClassTab";
import PresencesClassTab from "./PresencesClassTab";
import { StudentClassTab } from "./StudentClassTab";
type DetailClassTabsProps = {
  slug: string;
  classId: string;
};

const DetailClassTabs: React.FC<DetailClassTabsProps> = (props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleChangeTab = (value: string) => {
    router.replace(`${pathname}?${createQueryString("tab", value)}`);
  };

  return (
    <Tabs defaultValue={"details"} value={searchParams.get("tab")?.toString()}>
      <TabsList className="flex justify-start">
        <TabsTrigger onClick={() => handleChangeTab("details")} value="details">
          Details
        </TabsTrigger>
        <TabsTrigger
          onClick={() => handleChangeTab("presences")}
          value="presences"
        >
          Presences
        </TabsTrigger>
        <TabsTrigger
          onClick={() => handleChangeTab("students")}
          value="students"
        >
          Students
        </TabsTrigger>
      </TabsList>
      <DescriptionClassTab slug={props.slug} />
      <PresencesClassTab classId={props.classId} slug={props.slug} />
      <StudentClassTab slug={props.slug} />
    </Tabs>
  );
};

export default DetailClassTabs;
