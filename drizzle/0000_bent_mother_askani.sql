CREATE TABLE `donor_pledges` (
	`id` text PRIMARY KEY NOT NULL,
	`reference_code` text NOT NULL,
	`donor_type` text NOT NULL,
	`full_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`city` text NOT NULL,
	`support_channel` text NOT NULL,
	`amount_range` text NOT NULL,
	`frequency` text NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`contact_permission` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `donor_pledges_reference_code_unique` ON `donor_pledges` (`reference_code`);--> statement-breakpoint
CREATE TABLE `support_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`reference_code` text NOT NULL,
	`full_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`city` text NOT NULL,
	`age_range` text NOT NULL,
	`wedding_window` text NOT NULL,
	`support_types` text NOT NULL,
	`monthly_income` text NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`contact_permission` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `support_applications_reference_code_unique` ON `support_applications` (`reference_code`);