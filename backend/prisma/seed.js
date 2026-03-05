import prisma from "../src/lib/prisma.js";
import { seedCategories } from "./seed/category.seed.js";

async function main() {
  console.log("Starting seed...");

  await seedCategories();

  console.log("All seeds completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
