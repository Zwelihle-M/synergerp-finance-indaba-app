"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import ThemeSwitcher from "@/components/ui/theme-switcher";
import SynergLogo from "@/public/logo/synerp-logo.png";
import Image from "next/image";
import { navigationbarLinks } from "@/data";

const Navigationbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      height="5rem"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className=" md:px-10"
    >
      <NavbarBrand>
        <Image src={SynergLogo} alt="Synerg logo" width={200} height={200} />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-5" justify="end">
        {navigationbarLinks.map((link) => (
          <NavbarItem key={link.target}>
            <Link href={link.target} className="text-xl">
              {link.name}
            </Link>
          </NavbarItem>
        ))}

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navigationbarLinks.map((link) => (
          <NavbarMenuItem key={link.target}>
            <Link
              href={link.target}
              className="text-2xl font-medium tracking-wide "
            >
              {link.name}
            </Link>
          </NavbarMenuItem>
        ))}

        <NavbarMenuItem>
          <ThemeSwitcher />
        </NavbarMenuItem>
      </NavbarMenu>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
    </Navbar>
  );
};

export default Navigationbar;

