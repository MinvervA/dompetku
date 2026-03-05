import prisma from "../../src/lib/prisma.js";

export const seedCategories = async () => {
  console.log("Seeding categories...");

  const categories = [
    { name: "Makan", icon: "food" },
    { name: "Transport", icon: "transport" },
    { name: "Tagihan", icon: "bills" },
    { name: "Belanja", icon: "shopping" },
    { name: "Gaji", icon: "salary" },
    { name: "Kesehatan", icon: "health" },
    { name: "Hiburan", icon: "entertainment" },
    { name: "Sampingan", icon: "freelance" },
    { name: "Lainnya", icon: "others" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log(`✅ ${`categories.length`} categories seeded!`);
};
