import { Text } from "@radix-ui/themes";
import { createClient } from "@/utils/supabase-auth/server";
import { getUserById } from "@/utils/supabase-database/queries";

export default async function SubscriptionDetail() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const dbUser = await getUserById(user.id);

  if (dbUser[0] && dbUser[0].subscriptionEnd !== null) {
    const subscriptionEndDate = new Date(
      dbUser[0].subscriptionEnd * 1000
    ).toLocaleDateString("en-US");

    const stripeSubscriptionId = dbUser[0].stripeSubscriptionId;
    const stripeCustomerId = dbUser[0].stripeCustomerId;

    return (
      <div className="flex flex-col font-bold">
        <Text>Customer ID: {stripeCustomerId}</Text>
        <Text>Subscription ID: {stripeSubscriptionId}</Text>
        <Text>Subscription End: {subscriptionEndDate}</Text>
      </div>
    );
  }

  return null;
}
