CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"full_name" varchar(256),
	"user_name" varchar(256),
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	"stripe_customer_id" varchar(256),
	"stripe_subscription_id" varchar(256),
	"subscription_end" integer
);
