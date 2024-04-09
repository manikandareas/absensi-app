import ClassesAction from "@/components/elements/ClassesAction";
import { ClassesCards } from "@/components/elements/ClassesCards";
import Container from "@/components/elements/Container";
import GenerateBreadcrumb, {
  BreadcrumbURLs,
} from "@/components/elements/GenerateBreadcrumb";
import Heading from "@/components/elements/Heading";
import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type ClassesPageProps = {};

const breadcrumbURLs: BreadcrumbURLs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Classes",
    href: "/classes",
  },
];

const ClassesPage: React.FC<ClassesPageProps> = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <Container>
      <Heading>Classes</Heading>
      <GenerateBreadcrumb urls={breadcrumbURLs} />
      <ClassesAction />
      <ClassesCards userId={session.user.id} />
    </Container>
  );
};
export default ClassesPage;
