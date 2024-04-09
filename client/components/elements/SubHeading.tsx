import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type SubHeadingProps = React.PropsWithChildren<React.ComponentProps<"h2">>;

const SubHeading: React.FC<SubHeadingProps> = (props) => {
  return (
    <h2
      {...props}
      className={cn("mb-2 mt-4 text-xl font-bold", props.className)}
    >
      {props.children}
    </h2>
  );
};
export default SubHeading;
