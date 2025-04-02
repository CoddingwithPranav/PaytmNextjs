"use client";

// import Image, { type ImageProps } from "next/image";
// import { Button } from "@repo/ui/button";
// import styles from "./page.module.css";
// import { Card } from "@repo/ui/card";
// import { AppBar } from "@repo/ui/appBar";
// type Props = Omit<ImageProps, "src"> & {
//   srcLight: string;
//   srcDark: string;
// };
import { signIn, signOut, useSession } from "next-auth/react";


export default function Home() { 
  const session = useSession();
  console.log(session.data?.user)
  return (
    <>
      {/* <AppBar 
        user={session.data?.user} 
        onSignout={signOut} 
        onSignin={signIn}
      /> */}
    </>
  );
}
