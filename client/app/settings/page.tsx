import Container from "@/components/elements/Container";
import GenerateBreadcrumb, {
  BreadcrumbURLs,
} from "@/components/elements/GenerateBreadcrumb";
import Heading from "@/components/elements/Heading";
import SettingsTabs from "@/components/elements/SettingsTabs";
import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type SettingsPageProps = {};
const breadcrumbURLs: BreadcrumbURLs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];
const SettingsPage: React.FC<SettingsPageProps> = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");
  return (
    <Container>
      <Heading>Settings</Heading>
      <GenerateBreadcrumb urls={breadcrumbURLs} />
      <SettingsTabs userId={session?.user.id} />
    </Container>
  );
};
export default SettingsPage;
