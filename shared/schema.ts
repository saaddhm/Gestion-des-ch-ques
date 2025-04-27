import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const checks = pgTable("checks", {
  id: serial("id").primaryKey(),
  beneficiary: text("beneficiary").notNull(),
  amount: doublePrecision("amount").notNull(),
  amountInFrench: text("amount_in_french").notNull(),
  amountInArabic: text("amount_in_arabic").notNull(),
  place: text("place").notNull(),
  date: text("date").notNull(),
  bank: text("bank").notNull(),
  marginTop: doublePrecision("margin_top").default(0),
  marginLeft: doublePrecision("margin_left").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCheckSchema = createInsertSchema(checks).omit({
  id: true,
  createdAt: true
});

export type InsertCheck = z.infer<typeof insertCheckSchema>;
export type Check = typeof checks.$inferSelect;

// Bank information
export const banks = [
  { id: "attijariwafa", name: "Attijariwafa Bank" },
  { id: "bp", name: "Banque Populaire" },
  { id: "bmce", name: "BMCE Bank" },
  { id: "cih", name: "CIH Bank" },
  { id: "sgm", name: "Société Générale Maroc" },
];

export type Bank = typeof banks[number];
