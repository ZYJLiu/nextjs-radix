import React from "react";
import { createClient } from "@/utils/supabase-auth/server";
import { insertUser } from "@/utils/supabase-database/queries";
import { redirect } from "next/navigation";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // console.log(user);

    const newUser = {
      id: user.id,
      email: user.email ?? null,
      fullName: user.user_metadata?.full_name ?? null,
      userName: user.user_metadata?.user_name ?? null,
      createdAt: user.created_at ?? null,
      updatedAt: user.updated_at ?? null,
    };

    try {
      const insertedUser = await insertUser(newUser);
      console.log("User inserted:", insertedUser);
    } catch (error) {
      console.error("Error inserting user:", error);
    }
  } else {
    console.log("No user data available to insert.");
  }

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
