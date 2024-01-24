import React from "react";
import { createClient } from "@/utils/supabase-auth/server";
import { redirect } from "next/navigation";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <>
      {user ? (
        <form action={signOut}>
          <Button type="submit" size="2">
            Sign Out
          </Button>
        </form>
      ) : (
        <Button asChild size="2">
          <Link href="/signin">Sign In</Link>
        </Button>
      )}
    </>
  );
}
