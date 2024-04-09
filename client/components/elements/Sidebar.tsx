"use client";
import { ChevronsLeft, Settings } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useSidebarContext } from "@/context/SidebarContext";
import { lecturerSidebarItems, sidebarItems } from "@/constants/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef } from "react";
import SidebarItems from "./SidebarItems";
import SpecialComponent from "./SpecialComponent";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const { isOpen, setIsOpen } = useSidebarContext();
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setIsOpen, isOpen]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed left-0 top-0 z-50 min-h-full w-1/2 -translate-x-full bg-secondary transition-all  ease-in-out sm:w-full sm:max-w-xs",
          { "translate-x-0": isOpen },
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Image src={"/logo.png"} alt="Logo" width={45} height={45} />
          <Button
            onClick={() => setIsOpen(false)}
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
          >
            <ChevronsLeft
              className={cn({
                "rotate-180 transition-transform ease-in-out": !isOpen,
              })}
            />
          </Button>
        </div>

        <SpecialComponent
          lectureComponent={
            <SidebarItems pathname={pathname} items={lecturerSidebarItems} />
          }
          studentComponent={
            <SidebarItems pathname={pathname} items={sidebarItems} />
          }
        />

        <div className="absolute bottom-0 w-full p-4">
          <Link
            href={"/settings"}
            className="group flex items-center rounded-sm px-2 py-2 text-sm text-muted-foreground hover:bg-primary-foreground hover:text-secondary-foreground"
          >
            <Settings className="transition-all ease-linear group-hover:rotate-45" />{" "}
            <span className="ml-3">Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
