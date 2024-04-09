"use client";
import { createClassSchema } from "@/app/classes/form/create-class";
import { generateRandomToken } from "@/lib/utils";
import { useCreateClassMutation } from "@/services/classes/create-class";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dices, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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

export function CreateClassSheet() {
  const router = useRouter();
  const closeSheetRef = useRef<ElementRef<"button">>(null);
  const createClassForm = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      title: "",
      descriptions: "",
      slug: "",
      invitationToken: "",
    },
  });

  const handleBtnRandomToken = () => {
    createClassForm.setValue("invitationToken", generateRandomToken(6));
  };

  const { isPending, mutateAsync } = useCreateClassMutation({
    onSuccess: () => {
      toast.success("Success created class");
      queryClient.invalidateQueries({ queryKey: ["user-classes"] });
      closeSheetRef.current?.click();
      createClassForm.reset();
    },
    onError: () => {
      toast.error("Like something is wrong, try again later");
    },
  });

  const handleSubmit = async (data: z.infer<typeof createClassSchema>) => {
    const res = await mutateAsync({
      title: data.title,
      description: data.descriptions,
      invitationToken: data.invitationToken,
      slug: data.slug,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mb-4" ref={closeSheetRef}>
          Create class
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] space-y-4 sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Create new class</SheetTitle>
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
              {isPending ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
export default CreateClassSheet;
