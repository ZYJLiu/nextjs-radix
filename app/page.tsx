import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { createClient } from "@/utils/supabase-auth/server";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Flex direction="column" align="center" gap="2">
      {user ? (
        <>
          <Heading size="8">
            Welcome back
            {user.user_metadata?.full_name &&
              `, ${user.user_metadata?.full_name}`}
          </Heading>
          <Text size="5" color="gray">
            You are now authenticated into the application
          </Text>
          <Flex align="center" gap="3" mt="4">
            {/* <Button asChild size="3" variant="soft">
              <NextLink href="/">View account</NextLink>
            </Button> */}
          </Flex>
        </>
      ) : (
        <>
          <Heading size="8">Supabase Auth</Heading>
          <Text size="5" color="gray" mb="4">
            Sign In with GitHub
          </Text>
        </>
      )}
    </Flex>
  );
}
