import React from "react";
import {
  TooltipContent,
  TooltipProvider,
  Tooltip as TooltipShadcn,
  TooltipTrigger,
} from "../ui/tooltip";

type TooltipProps = {
  children: React.ReactNode;
  description?: string | React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = (props) => {
  return (
    <TooltipProvider>
      <TooltipShadcn>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent>
          <p>{props.description}</p>
        </TooltipContent>
      </TooltipShadcn>
    </TooltipProvider>
  );
};
export default Tooltip;
