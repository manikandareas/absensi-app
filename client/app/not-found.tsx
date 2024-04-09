import Container from "@/components/elements/Container";
import NotFoundImg from "@/components/ui/NotFoundImg";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NotFoundPageProps = {};

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <Container className="flex h-[calc(100vh-4rem)] flex-col-reverse items-center justify-center md:flex-row ">
      <div className="space-y-4 sm:w-1/2">
        <h1 className="text-3xl font-bold">
          Upps the page you are looking for is not available!
        </h1>
        <p className="text-muted-foreground">
          it seems that the page you are looking for does not exist
        </p>
        <Link href={"/"} className={cn(buttonVariants())}>
          Back to home
        </Link>
      </div>
      <NotFoundImg />
    </Container>
  );
};
export default NotFoundPage;
