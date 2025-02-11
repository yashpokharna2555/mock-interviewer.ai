import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_Hky65jiNKUXD@ep-cold-recipe-a80feoh2-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
  }
});