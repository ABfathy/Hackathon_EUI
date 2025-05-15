import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Create default forum sections
  await prisma.forumSection.createMany({
    data: [
      {
        name: 'Parents Support',
        description: 'A forum for parents to discuss and support each other.',
        type: 'PARENTS_ONLY',
      },
      {
        name: 'Teen Talk',
        description: 'A safe space for teens to share and connect.',
        type: 'TEENS_ONLY',
      },
      {
        name: 'Family Zone',
        description: 'A forum for both parents and teens to interact.',
        type: 'BOTH',
      },
    ],
    skipDuplicates: true,
  })

  console.log('Default forum sections created.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 