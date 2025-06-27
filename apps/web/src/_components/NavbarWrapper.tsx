"use client";

import { usePathname } from "next/navigation";
import Navbar from "@elearning-fliki/ui/src/components/organisms/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  return <Navbar pathname={pathname} />;
}
