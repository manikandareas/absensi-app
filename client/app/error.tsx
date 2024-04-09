"use client"; // Error components must be Client Components

import Container from "@/components/elements/Container";
import InternalServerErrorImg from "@/components/ui/InternalServerErrorImg";
import NotFoundImg from "@/components/ui/NotFoundImg";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, consoleApp } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    consoleApp("Something wrong")(error);
  }, [error]);

  return (
    <Container className="flex h-[calc(100vh-4rem)] flex-col-reverse items-center justify-center md:flex-row ">
      <div className="space-y-4 sm:w-1/2">
        <h1 className="text-3xl font-bold">{error.name}!</h1>
        <p className="text-muted-foreground">{error.message}</p>
        <div className="flex items-center space-x-2">
          <Link href={"/"} className={cn(buttonVariants())}>
            Back to home
          </Link>
          <Button onClick={() => reset()} variant={"secondary"}>
            Refresh
          </Button>
        </div>
      </div>
      <InternalServerErrorImg />
    </Container>
  );
}
