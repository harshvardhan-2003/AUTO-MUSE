// import 'dotenv/config';
// import { defineConfig } from 'drizzle-kit';
/** @type {import("drizzle-kit").Config} */

export default {
  out: './drizzle',
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_0xPIiXFj2zVY@ep-divine-credit-a833fk48-pooler.eastus2.azure.neon.tech/AI-contet-generator?sslmode=require&channel_binding=require',
  },
};
