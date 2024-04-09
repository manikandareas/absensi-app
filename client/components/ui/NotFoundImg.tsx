import Image from "next/image";

type NotFoundImgProps = {};

const NotFoundImg: React.FC<NotFoundImgProps> = () => {
  return (
    <Image
      src={
        "https://img.icons8.com/external-sapphire-kerismaker/300/external-Not-Found-web-maintenance-sapphire-kerismaker.png"
      }
      alt="Not Found"
      loading="lazy"
      priority={false}
      width={300}
      height={300}
    />
  );
};
export default NotFoundImg;
