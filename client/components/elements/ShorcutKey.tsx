"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ShortcutKeyProps = {};

const ShortcutKey: React.FC<ShortcutKeyProps> = () => {
  const router = useRouter();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push("/settings");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
export default ShortcutKey;
