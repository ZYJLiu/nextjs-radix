import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./db";
const main = async () => {
  console.log("migration running");
  await migrate(db, { migrationsFolder: "./utils/supabase-database/drizzle" });
  console.log("migration finished");
};

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    process.exit();
  });
