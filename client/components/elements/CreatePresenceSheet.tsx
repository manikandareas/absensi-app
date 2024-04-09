"use client";
import { createPresenceSchema } from "@/app/classes/[class-slug]/presences/form/create-presence";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElementRef, useRef } from "react";
import { useGeolocated } from "react-geolocated";
import { useForm } from "react-hook-form";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Switch } from "../ui/switch";

import { toast } from "sonner";

import { useCreateClassPresenceMutation } from "@/services/classes/create-class-presence";
import { Loader2 } from "lucide-react";
import { queryClient } from "../providers/react-query";

export function CreatePresenceSheet(props: { classId: string }) {
  const closeSheetRef = useRef<ElementRef<"button">>(null);

  const { mutateAsync, isPending } = useCreateClassPresenceMutation({
    onSuccess: () => {
      closeSheetRef.current?.click();
      queryClient.invalidateQueries({
        queryKey: ["class-presences", props.classId],
      });
      toast.success("Success created class presence");
    },
  });
  const { coords, isGeolocationEnabled, isGeolocationAvailable } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });

  const createPresenceForm = useForm<z.infer<typeof createPresenceSchema>>({
    resolver: zodResolver(createPresenceSchema),
    defaultValues: {
      isSecure: false,
      toleranceTimes: 60,
      expireMinutes: 60,
    },
  });

  const handleSubmit = async (data: z.infer<typeof createPresenceSchema>) => {
    if (data.isSecure && !isGeolocationEnabled) {
      toast.warning(
        "Please enable your geolocation first and then reload the page",
      );
      return;
    }
    if (data.isSecure && coords) {
      data.geolocation = {
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      };
      await mutateAsync({
        ...data,
        classId: props.classId,
      });

      return;
    }
    await mutateAsync({
      ...data,
      classId: props.classId,
    });
  };

  if (!isGeolocationAvailable && window) {
    return (
      <div className="my-1.5 w-full rounded-lg bg-red-500 px-2 py-4">
        Browser doesn&apos;t support geolocation, please use another browser
      </div>
    );
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mb-4" variant={"secondary"} ref={closeSheetRef}>
          Create Presence
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] space-y-4 sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Create new class presence</SheetTitle>
          <SheetDescription>
            Create a new class to share with students.
          </SheetDescription>
        </SheetHeader>
        <Form {...createPresenceForm}>
          <form
            onSubmit={createPresenceForm.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={createPresenceForm.control}
              name="expireMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expire Minutes</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="60" {...field} />
                  </FormControl>
                  <FormDescription>
                    Expire minutes of the class presence
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createPresenceForm.control}
              name="toleranceTimes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Tolerance</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="0" {...field} />
                  </FormControl>
                  <FormDescription>
                    Students who attend within the tolerance time range will
                    have a late status.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createPresenceForm.control}
              name="isSecure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Secure</FormLabel>
                  <FormControl>
                    <div>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    If secure true student location will be tracked.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Presence"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default CreatePresenceSheet;
