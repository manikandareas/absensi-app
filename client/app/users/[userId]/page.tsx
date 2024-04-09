import Container from "@/components/elements/Container";
import DetailProfile from "@/components/elements/DetailProfile";
import GenerateBreadcrumb, {
  BreadcrumbURLs,
} from "@/components/elements/GenerateBreadcrumb";
import Heading from "@/components/elements/Heading";
import { authOptions } from "@/services/auth";
import { findUserContactsService } from "@/services/users/find-user-contacts";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

type UserProfilePageProps = {
  params: {
    userId: string;
  };
};

const cachedUser = cache(
  async (userId: string) =>
    await findUserContactsService(userId).then((res) => res.data.data),
);
const UserProfilePage: React.FC<UserProfilePageProps> = async (props) => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  const data = await cachedUser(props.params.userId);
  const breadcrumbURLs: BreadcrumbURLs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Users",
      href: "/",
    },
    {
      name: data?.user.name as string,
      href: `/users/${props.params.userId}`,
    },
  ];
  return (
    <Container>
      <Heading>{data?.user.name}</Heading>
      <GenerateBreadcrumb urls={breadcrumbURLs} />
      <DetailProfile data={data} />
    </Container>
  );
};
export default UserProfilePage;
