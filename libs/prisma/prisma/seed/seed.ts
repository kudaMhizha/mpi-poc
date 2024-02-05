import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {roleId: 1, name: 'Super Admin', description: 'Super Admin'},
      {roleId: 2, name: 'Support Admin', description: 'Support Admin'},
      {roleId: 3, name: 'User', description: 'User'},
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
