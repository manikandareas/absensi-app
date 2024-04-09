import { FindUserContactsResponse } from "@/types/users";
import { Phone } from "lucide-react";
import Link from "next/link";
import {
  SiFacebook,
  SiInstagram,
  SiMaildotru,
  SiTelegram,
  SiWhatsapp,
} from "react-icons/si";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type DetailProfileProps = {
  data: FindUserContactsResponse["data"];
};

const DetailProfile: React.FC<DetailProfileProps> = (props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.data?.user.name}</CardTitle>
        <CardDescription>{props.data?.user.universityId}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <ContactItem
          href={props.data?.user.email}
          name={
            <>
              <SiMaildotru />
              <span>E-Mail</span>
            </>
          }
          value={props.data?.user.email}
        />
        <div className="">
          <span className="text-xs font-medium text-muted-foreground">
            Role
          </span>
          <h1 className="font-semibold normal-case">{props.data?.user.role}</h1>
        </div>
        <ContactItem
          href={props.data?.numberPhone ?? ""}
          name={
            <>
              <Phone size={13} />
              <span>Phone Number</span>
            </>
          }
          value={props.data?.numberPhone ?? ""}
        />
        <ContactItem
          href={props.data?.whatsApp ?? ""}
          name={
            <>
              <SiWhatsapp />
              <span>WhatsApp</span>
            </>
          }
          value={props.data?.whatsApp ?? ""}
        />
        <ContactItem
          href={props.data?.instagram ?? ""}
          name={
            <>
              <SiInstagram />
              <span>Instagram</span>
            </>
          }
          value={props.data?.instagram ?? ""}
        />
        <ContactItem
          href={props.data?.facebook ?? ""}
          name={
            <>
              <SiFacebook />
              <span>Facebook</span>
            </>
          }
          value={props.data?.facebook ?? ""}
        />
        <ContactItem
          href={props.data?.telegram ?? ""}
          name={
            <>
              <SiTelegram />
              <span>Telegram</span>
            </>
          }
          value={props.data?.telegram ?? ""}
        />
      </CardContent>
      {/* <CardFooter className="flex items-center gap-2">
        <Link
          href={"https://wa.me/6285171227008"}
          className={cn(buttonVariants())}
        >
          Contact Lecturer
        </Link>
      </CardFooter> */}
    </Card>
  );
};
export default DetailProfile;

const ContactItem = (props: {
  name: React.ReactNode;
  href?: string;
  value?: string;
}) => {
  if (!props.value || !props.href) return null;
  return (
    <div className="">
      <div className="flex items-center gap-x-1.5 text-xs font-medium text-muted-foreground">
        {props.name}
      </div>
      <Link href={props.href}>
        <h1 className="font-semibold">{props.value}</h1>
      </Link>
    </div>
  );
};
