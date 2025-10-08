import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const urlScans = pgTable("url_scans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  normalizedUrl: text("normalized_url").notNull(),
  verdict: varchar("verdict", { length: 20 }).notNull(), // SAFE, SUSPICIOUS, DANGEROUS
  confidence: integer("confidence").notNull(), // 0-100
  summary: text("summary").notNull(),
  reasons: text("reasons").array().notNull(),
  technicalDetails: text("technical_details"),
  scanSource: varchar("scan_source", { length: 50 }).notNull(), // heuristic, google_safe_browsing, phishtank
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const urlReports = pgTable("url_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scanId: varchar("scan_id").references(() => urlScans.id).notNull(),
  userVerdict: varchar("user_verdict", { length: 20 }), // user's opinion on the result
  notes: text("notes"),
  isHelpful: boolean("is_helpful"), // whether the user found the result helpful
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const insertUrlScanSchema = createInsertSchema(urlScans).omit({
  id: true,
  createdAt: true,
});

export const insertUrlReportSchema = createInsertSchema(urlReports).omit({
  id: true,
  createdAt: true,
});

export const checkUrlRequestSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  source: z.enum(["manual", "batch"]).default("manual"),
});

export const reportUrlRequestSchema = z.object({
  scanId: z.string().uuid("Invalid scan ID"),
  userVerdict: z.enum(["safe", "suspicious", "dangerous"]).optional(),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
  isHelpful: z.boolean().optional(),
});

export type UrlScan = typeof urlScans.$inferSelect;
export type InsertUrlScan = z.infer<typeof insertUrlScanSchema>;
export type UrlReport = typeof urlReports.$inferSelect;
export type InsertUrlReport = z.infer<typeof insertUrlReportSchema>;
export type CheckUrlRequest = z.infer<typeof checkUrlRequestSchema>;
export type ReportUrlRequest = z.infer<typeof reportUrlRequestSchema>;
