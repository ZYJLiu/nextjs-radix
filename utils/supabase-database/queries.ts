import { eq } from "drizzle-orm";
import { db } from "./db";
import { Users, users } from "./schema";

export async function insertUser(newUser: Users): Promise<Users[]> {
  const insertedUser = await db
    .insert(users)
    .values(newUser)
    .onConflictDoUpdate({
      target: users.id,
      set: {
        email: newUser.email,
        fullName: newUser.fullName,
        userName: newUser.userName,
        updatedAt: newUser.updatedAt,
      },
    })
    .returning();

  return insertedUser;
}

export async function updateSubscriptionDetails(
  email: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  subscriptionEnd: number
) {
  const result = await db
    .update(users)
    .set({
      stripeCustomerId: stripeCustomerId,
      stripeSubscriptionId: stripeSubscriptionId,
      subscriptionEnd: subscriptionEnd,
    })
    .where(eq(users.email, email))
    .returning({ userId: users.id });

  return result;
}
