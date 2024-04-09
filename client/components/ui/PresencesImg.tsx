import Image from "next/image";

type PresencesImgProps = {};

const PresencesImg: React.FC<PresencesImgProps> = () => {
  return (
    <Image
      src={"https://img.icons8.com/stickers/100/attendance-mark.png"}
      alt="Presences"
      width={100}
      height={100}
    />
  );
};
export default PresencesImg;
