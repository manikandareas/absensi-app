import { cn } from "@/lib/utils";

type ContainerProps = React.PropsWithChildren<React.ComponentProps<"main">>;
const Container: React.FC<ContainerProps> = (props) => {
  return (
    <main
      {...props}
      className={cn("container relative px-2 py-8 sm:px-8", props.className)}
    >
      {props.children}
    </main>
  );
};

export default Container;
