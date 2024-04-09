"use client";
import { generateRandomToken } from "@/lib/utils";
import { useUpdateClassMutation } from "@/services/classes/update-class";
import { FindClassResponse } from "@/types/classes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dices, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";

const createClassSchema = z.object({
  title: z.string().min(3).max(40),
  descriptions: z.string().min(5),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9-]+$/),
  invitationToken: z.string().min(6).optional(),
});

export function UpdateClassSheet() {
  const slug = useParams()["class-slug"];
  const { data } = queryClient.getQueryData(["class", slug])! as {
    data: FindClassResponse;
  };
  const closeButtonRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const createClassForm = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      title: data.data?.title,
      descriptions: data.data?.description ?? "",
      slug: data.data?.slug ?? "",
      invitationToken: data.data?.invitationToken ?? "",
    },
  });
  const handleBtnRandomToken = () => {
    createClassForm.setValue("invitationToken", generateRandomToken(6));
  };

  const { mutateAsync, isPending } = useUpdateClassMutation({
    onSuccess: ({ data: res }) => {
      queryClient.invalidateQueries({ queryKey: ["class", slug] });
      toast.success("Success updated class");
      closeButtonRef.current?.click();
      router.replace(`/classes/${res.data?.slug}`);
    },
    onError: (error) => {
      const response = error.response?.data as unknown as { message: string };
      toast.error(response.message as unknown as string);
    },
  });

  const handleSubmit = async (values: z.infer<typeof createClassSchema>) => {
    await mutateAsync({
      invitationToken: values.invitationToken,
      slug: values.slug,
      title: values.title,
      description: values.descriptions,
      classId: data.data?.id as string,
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} ref={closeButtonRef}>
          Update
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] space-y-4 sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Update class</SheetTitle>
          <SheetDescription>
            Create a new class to share with students.
          </SheetDescription>
        </SheetHeader>
        <Form {...createClassForm}>
          <form
            onSubmit={createClassForm.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={createClassForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pemrograman Multimedia Interaktif 4A"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createClassForm.control}
              name="descriptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descriptions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your class description"
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your class descriptions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createClassForm.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="PMI-TIM-4A-2024" {...field} />
                  </FormControl>
                  <FormDescription>
                    Slug used as a class link. slug can only consist of the
                    Alphabet, numbers, and (-)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createClassForm.control}
              name="invitationToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invitation Token</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="PMITIM4A2024" {...field} />

                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        type="button"
                        onClick={handleBtnRandomToken}
                        className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground "
                      >
                        <Dices
                          size={18}
                          className="transition-transform ease-in-out group-hover:rotate-45 group-active:rotate-180"
                        />
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Create a unique invitation token for your class
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
export default UpdateClassSheet;
