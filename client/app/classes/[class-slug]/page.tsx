import Container from "@/components/elements/Container";
import DetailClassTabs from "@/components/elements/DetailClassTabs";
import GenerateBreadcrumb, {
  BreadcrumbURLs,
} from "@/components/elements/GenerateBreadcrumb";
import Heading from "@/components/elements/Heading";
import { findClassService } from "@/services/classes/find-class";
import { cache } from "react";

type DetailClassPageProps = {
  params: {
    "class-slug": string;
  };
};

const cachedClass = cache(
  async (slug: string) =>
    await findClassService(slug).then((res) => res.data.data),
);

const DetailClassPage: React.FC<DetailClassPageProps> = async (props) => {
  const slug = props.params["class-slug"];
  const classData = await cachedClass(slug);
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
      href: `/${props.params["class-slug"]}`,
    },
  ];

  return (
    <Container>
      <Heading>{classData?.title}</Heading>
      <GenerateBreadcrumb urls={breadcrumbURLs} />
      <DetailClassTabs
        slug={props.params["class-slug"]}
        classId={classData?.id!}
      />
    </Container>
  );
};
export default DetailClassPage;
