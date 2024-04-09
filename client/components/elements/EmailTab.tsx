"use client";
import { CircleUserRound, Loader2Icon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, SetStateAction, useCallback, useState } from "react";

import {
  isAvailable,
  useCheckAvailability,
} from "@/services/users/check-availability";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type EmailTabProps = {
  setActiveTab: React.Dispatch<SetStateAction<string>>;
};

const EmailTab: React.FC<EmailTabProps> = (props) => {
  const [message, setMessage] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { mutateAsync, isPending } = useCheckAvailability();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const email = e.currentTarget["email"].value;
    router.replace(`${pathname}?${createQueryString("email", email)}`);
    const response = await mutateAsync({
      email,
    }).then((val) => val.data.data?.find((res) => res.field === "email"));

    const availabilityEmail = isAvailable(response?.status!);

    if (!availabilityEmail) {
      setMessage("Email is already used. please use another email address");
    }
    if (availabilityEmail) props.setActiveTab("account");
  };

  // const handleInputEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   router.replace(`${pathname}?${createQueryString("email", e.target.value)}`);
  // };
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      if (!value) params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <form
      className="flex w-full flex-col items-center gap-y-3 rounded-md border p-8 shadow-sm"
      onSubmit={onSubmit}
    >
      <CircleUserRound size={30} className="text-primary" />
      <h1 className="text-xl font-extrabold text-primary">Sign Up</h1>
      <p className="text-center text-xs text-muted-foreground">
        Create your Absensi account with your email to sync all your data and
        account.
      </p>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Email" />
        <span className="text-xs text-red-500">{message}</span>
      </div>

      <span className="text-xs text-muted-foreground">
        By continuing, you&apos;re agreeing tou our&nbsp;
        <span className="text-primary">Terms and Privacy policy.</span>
      </span>
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          "Continue with email"
        )}
      </Button>
    </form>
  );
};
export default EmailTab;
