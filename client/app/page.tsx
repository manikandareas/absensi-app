import Container from "@/components/elements/Container";
import GenerateBreadcrumb, {
  BreadcrumbURLs,
} from "@/components/elements/GenerateBreadcrumb";
import Heading from "@/components/elements/Heading";
import { OverviewCards } from "@/components/elements/OverviewCards";
import { RecentAttendances } from "@/components/elements/RecentAttendances";
import { RecentClassPresences } from "@/components/elements/RecentClassPresence";
import SpecialComponent from "@/components/elements/SpecialComponent";
import SubHeading from "@/components/elements/SubHeading";
import { recentAttendance } from "@/constants/recentAttendances";
import { authOptions } from "@/services/auth";
import { findUserOverviewService } from "@/services/users/find-user-overview";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const breadcrumbURLs: BreadcrumbURLs = [
  {
    name: "Home",
    href: "/",
  },
];

const cachedClass = unstable_cache(
  async (userId: string) => await findUserOverviewService(userId),
  ["user-overview/server"],
);

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const overview = await cachedClass(session.user.id);
  return (
    <Container>
      <Heading>Hello {session?.user.name} 👋,</Heading>
      <GenerateBreadcrumb urls={breadcrumbURLs} />
      <React.Suspense fallback={<div>Loading...</div>}>
        <SpecialComponent
          lectureComponent={
            <OverviewCards
              data={[
                {
                  title: "Classes",
                  description: "Total classes that you have.",
                  href: "/classes",
                  img: "class",
                  textLink: "Show all classes",
                  count: overview.data.data?.classesCount || 0,
                },
              ]}
              overview={overview.data}
            />
          }
          studentComponent={
            <OverviewCards
              data={[
                {
                  title: "Classes",
                  description: "Total classes that you enrolled.",
                  href: "/classes",
                  img: "class",
                  textLink: "Show all classes",
                  count: overview.data.data?.classesCount || 0,
                },
                {
                  title: "Presences",
                  description: "Total attendance you have make.",
                  href: "/history-presences",
                  img: "presences",
                  textLink: "Show all presences",
                  count: overview.data.data?.presencesCount || 0,
                },
              ]}
              overview={overview.data}
            />
          }
        />
      </React.Suspense>
      <SubHeading>Recent Attendances</SubHeading>
      <SpecialComponent
        lectureComponent={<RecentClassPresences data={overview.data.data} />}
        studentComponent={<RecentAttendances data={overview.data.data} />}
      />
    </Container>
  );
}
