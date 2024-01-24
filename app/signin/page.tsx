"use client";
import { createClient } from "@/utils/supabase-auth/client";
import { getURL } from "@/utils/helpers";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default async function SignIn() {
  const supabase = createClient();
  return (
    <div className="flex flex-col space-y-4">
      <Auth
        supabaseClient={supabase}
        providers={["github"]}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={false}
        appearance={{
          theme: ThemeSupa,
        }}
        theme="dark"
        onlyThirdPartyProviders
      />
    </div>
  );
}
