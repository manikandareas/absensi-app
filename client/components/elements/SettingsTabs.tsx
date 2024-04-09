"use client";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { AppearanceTab } from "./AppearanceTab";
import ProfileTab from "./ProfileTab";
import AccountTab from "./AccountTab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SettingsTabsProps = {
  userId: string;
};

const SettingsTabs: React.FC<SettingsTabsProps> = (props) => {
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
    <Tabs
      defaultValue="profile"
      value={searchParams.get("tab")?.toString()}
      className=""
    >
      <TabsList>
        <TabsTrigger onClick={() => handleChangeTab("profile")} value="profile">
          Profile
        </TabsTrigger>
        <TabsTrigger onClick={() => handleChangeTab("account")} value="account">
          Account
        </TabsTrigger>
        <TabsTrigger
          onClick={() => handleChangeTab("appearance")}
          value="appearance"
        >
          Appearance
        </TabsTrigger>
      </TabsList>
      <ProfileTab userId={props.userId} />
      <AccountTab />
      <AppearanceTab />
    </Tabs>
  );
};
export default SettingsTabs;
