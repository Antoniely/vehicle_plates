"use client";

import React, { FC } from "react";
import { Header } from "../Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-4 lg:mx-auto">{children}</main>
    </>
  );
};
