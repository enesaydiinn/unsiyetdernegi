import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const supportApplications = sqliteTable("support_applications", {
  id: text("id").primaryKey(),
  referenceCode: text("reference_code").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  city: text("city").notNull(),
  ageRange: text("age_range").notNull(),
  weddingWindow: text("wedding_window").notNull(),
  supportTypes: text("support_types").notNull(),
  monthlyIncome: text("monthly_income").notNull(),
  notes: text("notes").notNull().default(""),
  contactPermission: integer("contact_permission", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const donorPledges = sqliteTable("donor_pledges", {
  id: text("id").primaryKey(),
  referenceCode: text("reference_code").notNull().unique(),
  donorType: text("donor_type").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  city: text("city").notNull(),
  supportChannel: text("support_channel").notNull(),
  amountRange: text("amount_range").notNull(),
  frequency: text("frequency").notNull(),
  message: text("message").notNull().default(""),
  contactPermission: integer("contact_permission", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
