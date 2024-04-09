"use client";
import { SignInSchema } from "@/app/auth/signin/form/signin";
import { SignInDTO } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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

type SignInFormProps = {};

const SignInForm: React.FC<SignInFormProps> = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: SignInDTO) =>
      signIn("credentials", {
        email: body.email,
        password: body.password,
        redirect: false,
      }),
  });
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    const response = await mutateAsync({
      email: values.email,
      password: values.password,
    });

    if (!response?.ok || response.error) {
      return toast.error("Upps email or password incorrect");
    }
    if (response.ok) {
      toast.success("Login success");
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="JohnDoe@mail.com" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                This is your email address.
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
                This is your secret password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2Icon className="animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
};
export default SignInForm;
