"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export function AppBarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Header onSignin={signIn} onSignout={async () => {
        await signOut()
        router.push("/api/auth/signin")
      }} user={session.data?.user} />
   </div>
  );
}
