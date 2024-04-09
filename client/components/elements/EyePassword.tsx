"use client";
import { ElementRef, RefObject, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

type EyePasswordProps = React.ComponentProps<"input">;

const EyePassword: React.FC<EyePasswordProps> = (props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const inputPassRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    if (inputPassRef.current && isShowPassword) {
      inputPassRef.current.type = "text";
    } else if (inputPassRef.current && !isShowPassword) {
      inputPassRef.current.type = "password";
    }
  }, [setIsShowPassword, isShowPassword, inputPassRef]);
  return (
    <div className="relative">
      <Input {...props} ref={inputPassRef} type="text" />
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        onClick={() => setIsShowPassword(!isShowPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground transition-all ease-in-out"
      >
        {!isShowPassword ? <Eye className="" /> : <EyeOff />}
      </Button>
    </div>
  );
};
export default EyePassword;
