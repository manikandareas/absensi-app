import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type SidebarItemsProps = {
  items: {
    title: string;
    icon: LucideIcon;
    link: string;
  }[];
  pathname: string;
};

const SidebarItems: React.FC<SidebarItemsProps> = (props) => {
  return (
    <div className="space-y-2 p-4">
      {props.items.map((item, index) => (
        <Link
          key={index + item.link}
          href={item.link}
          className={cn(
            "group flex items-center rounded-sm px-2 py-2 text-sm text-muted-foreground transition-all ease-in-out hover:bg-primary hover:text-primary-foreground",
            {
              "bg-primary text-primary-foreground ":
                props.pathname === item.link,
            },
          )}
        >
          <item.icon className="transition-transform ease-linear group-hover:rotate-45" />
          <span className="ml-3">{item.title}</span>
        </Link>
      ))}
    </div>
  );
};
export default SidebarItems;
