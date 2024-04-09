import Container from "@/components/elements/Container";
import GenerateBreadcrumb, {
  BreadcrumbURLs,
} from "@/components/elements/GenerateBreadcrumb";
import Heading from "@/components/elements/Heading";
import HistoryPresence, {
  HistoryPresences,
} from "@/components/elements/HistoryPresences";
import { OngoingPresenceCards } from "@/components/elements/OngoingPresenceCards";
import { PresenceCards } from "@/components/elements/PresencesCards";
import SubHeading from "@/components/elements/SubHeading";
import { consoleApp } from "@/lib/utils";
import { authOptions } from "@/services/auth";
import { findAllUserPresencesService } from "@/services/users/find-all-user-presences";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type HistoryPresencesPageProps = {};

const breadcrumbURLs: BreadcrumbURLs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "History Presences",
    href: "/history-presences",
  },
];

const HistoryPresencesPage: React.FC<HistoryPresencesPageProps> = async (
  props,
) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  return (
    <Container>
      <Heading>History Presences</Heading>
      <GenerateBreadcrumb urls={breadcrumbURLs} />
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className=" lg:w-1/3">
          <SubHeading>Ongoing Presences</SubHeading>
          <OngoingPresenceCards userId={session.user.id} />
        </div>
        <div className="grow ">
          <SubHeading>History</SubHeading>
          <HistoryPresences userId={session.user.id} />
        </div>
      </div>
    </Container>
  );
};
export default HistoryPresencesPage;
