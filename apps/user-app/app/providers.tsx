"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../components/themeProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StreamLine - Boost Your Productivity",
  description:
    "Streamline your workflow and boost productivity with our all-in-one platform.",
};
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};
