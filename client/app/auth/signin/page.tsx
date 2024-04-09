import Image from "next/image";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import SignInForm from "@/components/elements/SignInForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth";
import { redirect } from "next/navigation";

type SignInPageProps = {};

const SignInPage: React.FC<SignInPageProps> = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex max-w-md flex-grow flex-col gap-y-3">
        <div className="flex items-center justify-center gap-x-2">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
          <span className="font-semibold">Absensi</span>
        </div>

        <div className="flex w-full flex-col items-center gap-y-3 rounded-md border p-8 shadow-sm">
          <CircleUserRound size={30} className="text-primary" />
          <h1 className="text-xl font-extrabold text-primary">Sign In</h1>
          <p className="text-center text-xs text-muted-foreground">
            Sign In to your Absensi account.
          </p>
          <SignInForm />
        </div>

        <span className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href={"/auth/register"} className="text-primary">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};
export default SignInPage;
