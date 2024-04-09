"use client";
import { useForm } from "react-hook-form";
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
import { accountSchema } from "@/app/settings/form/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { TabsContent } from "../ui/tabs";

type AccountTabProps = {};

const AccountTab: React.FC<AccountTabProps> = () => {
  const accountForm = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof accountSchema>) => {
    toast.success("Successfully submitted", {
      description: JSON.stringify(data),
    });
  };
  return (
    <TabsContent
      value="account"
      className="w-full rounded-lg bg-card px-6 py-4"
    >
      <Form {...accountForm}>
        <form
          onSubmit={accountForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={accountForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
                <FormDescription>Change your password here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={accountForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" disabled {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"destructive"} disabled>
            Change Password
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
};
export default AccountTab;
