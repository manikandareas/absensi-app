import RegistrationForm from "@/components/elements/RegistrationForm";
import { authOptions } from "@/services/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type RegisterPageProps = {};

const RegisterPage: React.FC<RegisterPageProps> = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex max-w-md flex-grow flex-col gap-y-3">
        <div className="flex items-center justify-center gap-x-2">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
          <span className="font-semibold">Absensi</span>
        </div>
        <RegistrationForm />
        <span className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href={"/auth/signin"} className="text-primary">
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
};
export default RegisterPage;
