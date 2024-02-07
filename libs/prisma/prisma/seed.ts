/* Learn more about seeding here:
  @see: https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
 */
import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.info('Seeding users.....');

  for (let i = 0; i < 3; i++) {
    const fakeUser = {
      id: faker.string.nanoid(),
      email: faker.internet.email(),
      name: faker.person.firstName(),
      password: faker.internet.password(),
      surname: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
      confirmed: faker.datatype.boolean(),
      status: faker.datatype.boolean() ? 'ACTIVE' : 'BLOCKED',
      jobDescription: faker.person.jobTitle(),
      roleId: faker.helpers.rangeToNumber({min: 1, max: 3}),
    };

    await prisma.user.create({data: fakeUser});
  }
  console.log('Seed data inserted successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.warn('Error While generating Seed: \n', e);
    await prisma.$disconnect();
    process.exit(1);
  });
