import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aiOutput', {
  id: serial('id').primaryKey(),
  formData: text('formData').notNull(),              // stored as JSON string
  aiResponse: text('aiResponse').notNull(),          // AI-generated content
  templateSlug: varchar('templateSlug', { length: 100 }).notNull(),
  createdBy: varchar('createdBy', { length: 100 }).notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow() // stored as proper timestamp
});
