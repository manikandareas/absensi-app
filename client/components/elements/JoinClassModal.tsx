"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJoinClassMutation } from "@/services/classes/join-class";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { queryClient } from "../providers/react-query";

export function JoinClassModal() {
  const userId = useAuthStore((state) => state.user?.id)!;
  const [invitationToken, setInvitationToke] = useState<string>("");
  const closeModalRef = useRef<ElementRef<"button">>(null);
  const { isPending, mutateAsync } = useJoinClassMutation({
    onSuccess: ({ data }) => {
      toast.success(`Success joining class ${data.data?.title}`);
      queryClient.invalidateQueries({
        queryKey: ["user-classes"],
      });
      closeModalRef.current?.click();
    },
    onError: (error) => {
      const response = error.response?.data as unknown as { message: string };
      toast.error(response.message as unknown as string);
    },
  });

  const handleSubmit = async () => {
    await mutateAsync({ invitationToken, userId });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="mb-4" ref={closeModalRef}>
          Join Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join your new class</DialogTitle>
          <DialogDescription>
            Input invitation token from your lecturer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="token" className="text-right">
              Invitation Token
            </Label>
            <Input
              id="token"
              placeholder="TIM4A****"
              className="col-span-3"
              onChange={(e) => setInvitationToke(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Join"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default JoinClassModal;
