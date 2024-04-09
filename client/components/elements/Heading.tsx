import { PropsWithChildren } from "react";

type HeadingProps = PropsWithChildren & {};

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return <h1 className="mb-3 text-3xl font-bold">{children}</h1>;
};
export default Heading;
