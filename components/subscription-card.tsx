"use client";
import { Card, Button, Text } from "@radix-ui/themes";
import getStripe from "@/utils/stripe/stripe-client";
import { checkout } from "@/utils/stripe/actions/checkout";
import { createClient } from "@/utils/supabase-auth/client";
import { usePathname } from "next/navigation";

const plans = [
  { name: "Some Stuff", price: "1", id: "price_1ObdeECAyGhgfZfLTtngBywg" },
  {
    name: "More Stuff",
    price: "10",
    id: "price_1Oc2O9CAyGhgfZfL2g8tfg3W",
  },
  {
    name: "Most Stuff",
    price: "100",
    id: "price_1Oc2OZCAyGhgfZfLiykFaFCh",
  },
];

export default async function SubscriptionCard() {
  const supabase = createClient();
  const pathname = usePathname();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleCheckout = async (priceId: string) => {
    try {
      const { id } = JSON.parse(
        await checkout(user?.email!, location.origin + pathname, priceId)
      );
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId: id });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      console.log("done");
    }
  };
  return (
    <div className="flex justify-center space-x-4">
      {plans.map((plan) => (
        <Card key={plan.name}>
          <div className="flex flex-col justify-center items-center p-2">
            <Text className="font-bold text-xl mb-2">{plan.name}</Text>
            <Text className="mb-3">${plan.price} / Month</Text>
            <Button onClick={() => handleCheckout(plan.id)}>Subscribe</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
