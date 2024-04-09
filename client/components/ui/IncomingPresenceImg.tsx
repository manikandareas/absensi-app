import Image from "next/image";

type IncomingPresenceImgProps = {};

const IncomingPresenceImg: React.FC<IncomingPresenceImgProps> = () => {
  return (
    <Image
      src={"https://img.icons8.com/color/100/event-accepted-tentatively.png"}
      alt="Incoming Presence"
      height={100}
      width={100}
    />
  );
};
export default IncomingPresenceImg;
