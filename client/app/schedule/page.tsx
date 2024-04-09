import Container from "@/components/elements/Container";
import GenerateBreadcrumb, {
  BreadcrumbURLs,
} from "@/components/elements/GenerateBreadcrumb";
import Heading from "@/components/elements/Heading";
import ScheduleView from "@/components/elements/ScheduleView";
import { buttonVariants } from "@/components/ui/button";
import { constSchedule } from "@/constants/schedule";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SchedulePageProps = {};
const breadcrumbURLs: BreadcrumbURLs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Schedule",
    href: "/schedule",
  },
];
const SchedulePage: React.FC<SchedulePageProps> = () => {
  return (
    <Container>
      <Heading>Schedule</Heading>
      <GenerateBreadcrumb urls={breadcrumbURLs} />
      <div className={cn("mb-2 flex justify-end")}>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={constSchedule.downloadLink}
        >
          Download
        </Link>
      </div>
      <ScheduleView />
    </Container>
  );
};
export default SchedulePage;
