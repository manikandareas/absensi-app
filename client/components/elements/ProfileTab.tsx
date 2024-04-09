"use client";
import { contactsSchema } from "@/app/settings/form/contacts";
import { profileSchema } from "@/app/settings/form/profile";
import { useCreateOrUpdateContactsMutation } from "@/services/users/create-or-update-contacts";
import { useFindUserContactsQuery } from "@/services/users/find-user-contacts";
import { useUpdateUserMutation } from "@/services/users/update-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { queryClient } from "../providers/react-query";
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
import { TabsContent } from "../ui/tabs";
import SubHeading from "./SubHeading";

type ProfileTabProps = {
  userId: string;
};

const ProfileTab: React.FC<ProfileTabProps> = (props) => {
  const { data } = useFindUserContactsQuery({ userId: props.userId });
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: data?.data.data?.user.email as string,
      fullName: data?.data.data?.user.name as string,
      universityId: data?.data.data?.user.universityId as string,
      role: data?.data.data?.user.role as "LECTURER" | "STUDENT",
    },
  });
  const contactsForm = useForm<z.infer<typeof contactsSchema>>({
    resolver: zodResolver(contactsSchema),
    defaultValues: {
      facebook: data?.data.data?.facebook as string,
      instagram: data?.data.data?.instagram as string,
      numberPhone: data?.data.data?.numberPhone as string,
      telegram: data?.data.data?.telegram as string,
      whatsApp: data?.data.data?.whatsApp as string,
    },
  });

  const {
    mutateAsync: mutateUpdateUserAsync,
    isPending: mutateUpdateUserIsPending,
  } = useUpdateUserMutation({
    onSuccess: () => {
      toast.success("Success updated profile");
      queryClient.invalidateQueries({
        queryKey: ["user-contacts", props.userId],
      });
    },
    onError: (error) => {
      const response = error.response?.data as unknown as { message: string };
      toast.error(response.message as unknown as string);
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    await mutateUpdateUserAsync({
      body: {
        email: data.email,
        name: data.fullName,
        universityId: data.universityId,
      },
      userId: props.userId,
    });
  };

  const { mutateAsync, isPending } = useCreateOrUpdateContactsMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-contacts", props.userId],
      });

      toast.success("Success updated contacts");
    },
    onError: (error) => {
      const response = error.response?.data as unknown as { message: string };
      toast.error(response.message as unknown as string);
    },
  });

  const onContactsSubmit = async (data: z.infer<typeof contactsSchema>) => {
    await mutateAsync({
      ...data,
      userId: props.userId,
    });
  };
  return (
    <TabsContent
      value="profile"
      className="w-full rounded-lg bg-card px-6 py-4"
    >
      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <SubHeading>Edit Profile</SubHeading>
          <FormField
            control={profileForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Vito Andareas Manik" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="vitoandareas15@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="universityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University Id</FormLabel>
                <FormControl>
                  <Input placeholder="226651027" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="STUDENT" disabled {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutateUpdateUserIsPending}>
            Update
          </Button>
        </form>
      </Form>
      <SubHeading className="mb-0">Contacts</SubHeading>
      <Form {...contactsForm}>
        <form
          className="space-y-6"
          onSubmit={contactsForm.handleSubmit(onContactsSubmit)}
        >
          <div className="grid sm:grid-cols-2 sm:gap-4">
            <FormField
              control={contactsForm.control}
              name="numberPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+628xxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={contactsForm.control}
              name="whatsApp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="+628xxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={contactsForm.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://instagram.com/manikandareas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={contactsForm.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://t.me/manikandareas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={contactsForm.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://facebook.com/manikandareas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            Update Contacts
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
};
export default ProfileTab;
