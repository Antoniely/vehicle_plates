"use client";

import React from "react";
import { ModeThemeToggle } from "../ModeThemeToggle";
import { AvatarLogo } from "../Avatar";

export const Header = ({}) => {
  return (
    <header className="border-b border-x-0 border-black/20 dark:border-white/10 top-0  sticky">
      <nav className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <AvatarLogo />

        {/* Button Change Theme */}
        <ModeThemeToggle />
      </nav>
    </header>
  );
};
