"use client";
import { UserRole } from "@/types/auth";
import { useSession } from "next-auth/react";
import React from "react";

type SpecialComponentProps = {
  studentComponent: React.ReactNode;
  lectureComponent: React.ReactNode;
};

const SpecialComponent: React.FC<SpecialComponentProps> = (props) => {
  const session = useSession();

  if (session.status === "loading") return null;
  return (
    <React.Fragment>
      {session.data?.user.role === UserRole.LECTURER
        ? props.lectureComponent
        : props.studentComponent}
    </React.Fragment>
  );
};
export default SpecialComponent;
