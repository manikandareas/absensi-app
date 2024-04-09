"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import { ChevronsRight, MapPin, MapPinIcon, MapPinOffIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { DropdownProfile } from "./DropdownProfile";
import { ModeToggle } from "./ModeToggle";
import Tooltip from "./Tooltip";
import { useGeolocated } from "react-geolocated";
import Link from "next/link";
import { constNavbar } from "@/constants/navbar";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebarContext();
  const { isGeolocationEnabled, isGeolocationAvailable } = useGeolocated();
  return (
    !pathname.includes("auth") && (
      <header className="sticky left-0 top-0  z-40 flex h-16 w-full items-center border-b bg-background px-4">
        {!isOpen && (
          <Button
            className="rounded-full"
            onClick={() => setIsOpen(true)}
            variant={"ghost"}
            size={"icon"}
          >
            <ChevronsRight
              className={cn({
                "rotate-180 transition-transform ease-in-out": isOpen,
              })}
            />
          </Button>
        )}
        <div className="flex flex-grow items-center justify-end gap-x-4">
          {/* <Input
            type="search"
            placeholder="🔍  Search anything..."
            className="max-w-xs"
          /> */}
          {isGeolocationEnabled ? (
            <Tooltip description="Your geolocation is enabled">
              <MapPinIcon className="text-green-500" size={18} />
            </Tooltip>
          ) : (
            <Tooltip
              description={
                <span>
                  Your geolocation is disabled, Please enable to user this app.
                  <br />
                  <Link className="text-primary" href={constNavbar.mapsLink}>
                    Click here
                  </Link>{" "}
                  for more information.
                </span>
              }
            >
              <MapPinOffIcon className="text-muted-foreground" size={18} />
            </Tooltip>
          )}
          <ModeToggle />
          <DropdownProfile />
        </div>
      </header>
    )
  );
};
export default Navbar;
