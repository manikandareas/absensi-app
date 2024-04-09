import Image from "next/image";

type ClassImgProps = {};

const ClassImg: React.FC<ClassImgProps> = () => {
  return (
    <Image
      src="https://img.icons8.com/officel/100/class.png"
      alt="Class"
      width={100}
      height={100}
    />
  );
};
export default ClassImg;
