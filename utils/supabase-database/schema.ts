import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  email: varchar("email", { length: 256 }),
  fullName: varchar("full_name", { length: 256 }),
  userName: varchar("user_name", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 256 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 256 }),
  subscriptionEnd: integer("subscription_end"),
});

export type Users = InferSelectModel<typeof users>;
