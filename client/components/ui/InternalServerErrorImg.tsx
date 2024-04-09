import Image from "next/image";

type InternalServerErrorImgProps = {};

const InternalServerErrorImg: React.FC<InternalServerErrorImgProps> = () => {
  return (
    <Image
      src={
        "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/300/external-Server-Error-data-science-smashingstocks-flat-smashing-stocks.png"
      }
      alt="Internal Server Error"
      priority={false}
      width={300}
      height={300}
    />
  );
};
export default InternalServerErrorImg;
