import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/hash";
const prisma = new PrismaClient();
const main = async () => {
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      firstname: "Admin",
      lastname: "Example",
      password: (await hashPassword("!example123")).hash,
    },
  });
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
