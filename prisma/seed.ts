import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Regular User",
      password: userPassword,
      role: "USER",
    },
  });

  // Create plastic types
  const plastics = await Promise.all([
    prisma.plastic.upsert({
      where: { name: "PLA" },
      update: {},
      create: {
        name: "PLA",
        price: 25.0,
        description: "Polylactic Acid - Biodegradable and easy to print",
      },
    }),
    prisma.plastic.upsert({
      where: { name: "ABS" },
      update: {},
      create: {
        name: "ABS",
        price: 30.0,
        description: "Acrylonitrile Butadiene Styrene - Strong and durable",
      },
    }),
    prisma.plastic.upsert({
      where: { name: "PETG" },
      update: {},
      create: {
        name: "PETG",
        price: 35.0,
        description:
          "Polyethylene Terephthalate Glycol - Chemical resistant and flexible",
      },
    }),
    prisma.plastic.upsert({
      where: { name: "TPU" },
      update: {},
      create: {
        name: "TPU",
        price: 45.0,
        description: "Thermoplastic Polyurethane - Flexible and rubber-like",
      },
    }),
  ]);

  // Create colors
  const colors = await Promise.all([
    prisma.color.upsert({
      where: { name: "White" },
      update: {},
      create: {
        name: "White",
        hexCode: "#FFFFFF",
      },
    }),
    prisma.color.upsert({
      where: { name: "Black" },
      update: {},
      create: {
        name: "Black",
        hexCode: "#000000",
      },
    }),
    prisma.color.upsert({
      where: { name: "Red" },
      update: {},
      create: {
        name: "Red",
        hexCode: "#FF0000",
      },
    }),
    prisma.color.upsert({
      where: { name: "Blue" },
      update: {},
      create: {
        name: "Blue",
        hexCode: "#0000FF",
      },
    }),
    prisma.color.upsert({
      where: { name: "Green" },
      update: {},
      create: {
        name: "Green",
        hexCode: "#00FF00",
      },
    }),
    prisma.color.upsert({
      where: { name: "Yellow" },
      update: {},
      create: {
        name: "Yellow",
        hexCode: "#FFFF00",
      },
    }),
  ]);

  console.log("Database seeded successfully!");
  console.log("Admin user: admin@example.com / admin123");
  console.log("Regular user: user@example.com / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
