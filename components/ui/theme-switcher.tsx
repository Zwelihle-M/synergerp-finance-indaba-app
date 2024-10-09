"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import AnimatedSunIcon from "@/components/svg/animated-sun";
import AnimatedMoonIcon from "@/components/svg/animated-moon";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      radius="full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      isIconOnly
      size="sm"
      className="bg-transparent"
      disableAnimation={true}
    >
      <AnimatedSunIcon />
      <AnimatedMoonIcon />
    </Button>
  );
};

export default ThemeSwitcher;
