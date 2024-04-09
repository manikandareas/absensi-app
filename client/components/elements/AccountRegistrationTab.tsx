"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { AccountSchema } from "@/app/auth/register/form/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignUpMutation } from "@/services/users/signup";
import { UserRole } from "@/types/auth";
import { ArrowLeft, CircleUserRound, Loader2Icon } from "lucide-react";
import { SetStateAction } from "react";

type AccountRegistrationTabProps = {
  setActiveTab: React.Dispatch<SetStateAction<string>>;
};

const AccountRegistrationTab: React.FC<AccountRegistrationTabProps> = (
  props,
) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      fullName: "",
      universityId: "",
      role: "STUDENT",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync, isPending } = useSignUpMutation({
    onSuccess: () => {
      toast.success("Account created successfully");
      form.reset();
      router.push("/auth/signin");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    mutationKey: ["create-account"],
  });

  const searchParams = useSearchParams();
  const onSubmit = async (value: z.infer<typeof AccountSchema>) => {
    const email = searchParams.get("email") as string;
    await mutateAsync({
      email,
      role: value.role as UserRole,
      name: value.fullName,
      password: value.password,
      universityId: value.universityId,
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-y-3 rounded-md border p-8 shadow-sm">
      <div className="flex w-full items-center justify-between">
        <Button
          onClick={() => props.setActiveTab("email")}
          variant={"ghost"}
          size={"icon"}
          className="rounded-full"
        >
          <ArrowLeft />
        </Button>
        <CircleUserRound size={30} className="text-primary" />
        <ArrowLeft className="invisible" />
      </div>
      <h1 className="text-xl font-extrabold text-primary">Sign Up</h1>
      <p className="text-center text-xs text-muted-foreground">
        Create your Absensi account with your email to sync all your data and
        account.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-1"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  This is your public display name.
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="universityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University Id</FormLabel>
                <FormControl>
                  <Input placeholder="226651xxx" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  This is your university id. e.g nim or nip.
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="LECTURER">Lecturer</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Choose that fits your role.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Create a strong password.
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Input same password for confirmation.
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Sign up now"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default AccountRegistrationTab;
