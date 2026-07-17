CREATE TABLE `waitlist_signups` (
	`id` text PRIMARY KEY NOT NULL,
	`normalized_email` text NOT NULL,
	`original_email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`source` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_signups_normalized_email_unique` ON `waitlist_signups` (`normalized_email`);