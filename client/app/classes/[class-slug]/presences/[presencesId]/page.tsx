import Container from "@/components/elements/Container";
import DetailsPresence from "@/components/elements/DetailsPresence";
import GenerateBreadcrumb, {
  BreadcrumbURLs,
} from "@/components/elements/GenerateBreadcrumb";
import Heading from "@/components/elements/Heading";
import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type DetailsPresencesPageProps = {
  params: {
    "class-slug": string;
    presencesId: string;
  };
};

const DetailsPresencesPage: React.FC<DetailsPresencesPageProps> = async (
  props,
) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  const breadcrumbURLs: BreadcrumbURLs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Classes",
      href: "/classes",
    },
    {
      name: props.params["class-slug"],
      href: `/classes/${props.params["class-slug"]}`,
    },
    {
      name: "Presences",
      href: `/classes/${props.params["class-slug"]}?tab=presences`,
    },
    {
      name: "Details Presences",
      href: "",
    },
  ];
  return (
    <Container>
      <Heading>Details Presence</Heading>
      <GenerateBreadcrumb urls={breadcrumbURLs} />
      <DetailsPresence
        slug={props.params["class-slug"]}
        presenceId={props.params.presencesId}
        userId={session.user.id}
      />
    </Container>
  );
};
export default DetailsPresencesPage;
