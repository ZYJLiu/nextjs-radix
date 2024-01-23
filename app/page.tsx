import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { getUser } from "../auth";

export default async function Home() {
  const { isAuthenticated, user } = await getUser();
  return (
    <Flex direction="column" align="center" gap="2">
      {isAuthenticated ? (
        <>
          <Heading size="8">
            Welcome back{user?.firstName && `, ${user?.firstName}`}
          </Heading>
          <Text size="5" color="gray">
            You are now authenticated into the application
          </Text>
          <Flex align="center" gap="3" mt="4">
            <Button asChild size="3" variant="soft">
              <NextLink href="/account">View account</NextLink>
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Heading size="8">AuthKit</Heading>
          <Text size="5" color="gray" mb="4">
            Sign In
          </Text>
        </>
      )}
    </Flex>
  );
}
