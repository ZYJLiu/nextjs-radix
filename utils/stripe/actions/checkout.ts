"use server";
import { stripe } from "../stripe";
import { getURL } from "../../helpers";

export async function checkout(
  email: string,
  redirectTo: string,
  priceId: string
) {
  return JSON.stringify(
    await stripe.checkout.sessions.create({
      success_url: redirectTo || getURL(),
      cancel_url: getURL(),
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
    })
  );
}
