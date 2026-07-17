CREATE TABLE "waitlist_signups" (
	"id" uuid PRIMARY KEY NOT NULL,
	"normalized_email" text NOT NULL,
	"original_email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"source" text,
	CONSTRAINT "waitlist_signups_normalized_email_unique" UNIQUE("normalized_email")
);
