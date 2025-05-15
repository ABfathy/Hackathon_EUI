import { PrismaClient, IncidentType } from '../lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create example users
  const parentPassword = await bcrypt.hash('parent123', 10)
  const childPassword = await bcrypt.hash('child123', 10)
  const independentChildPassword = await bcrypt.hash('independent123', 10)

  // Create families
  const family1 = await prisma.family.create({
    data: {
      code: 'SMITH123',
    },
  })

  const family2 = await prisma.family.create({
    data: {
      code: 'JOHNSON456',
    },
  })

  // Create parent users
  const parent1 = await prisma.user.create({
    data: {
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@example.com',
      password: parentPassword,
      userType: 'PARENT',
      phoneNumber: '+201234567890',
      dateOfBirth: new Date('1980-01-01'),
      familyCode: family1.code,
    },
  })

  const parent2 = await prisma.user.create({
    data: {
      name: 'Fatima Ali',
      email: 'fatima.ali@example.com',
      password: parentPassword,
      userType: 'PARENT',
      phoneNumber: '+201234567891',
      dateOfBirth: new Date('1982-01-01'),
      familyCode: family2.code,
    },
  })

  // Create child users
  const child1 = await prisma.user.create({
    data: {
      name: 'Mohammed Hassan',
      email: 'mohammed.hassan@example.com',
      password: childPassword,
      userType: 'CHILD',
      phoneNumber: '+201234567892',
      dateOfBirth: new Date('2010-01-01'),
      familyCode: family1.code,
      parentEmail: parent1.email,
      parentPhone: parent1.phoneNumber,
    },
  })

  const child2 = await prisma.user.create({
    data: {
      name: 'Amina Ali',
      email: 'amina.ali@example.com',
      password: childPassword,
      userType: 'CHILD',
      phoneNumber: '+201234567893',
      dateOfBirth: new Date('2012-01-01'),
      familyCode: family2.code,
      parentEmail: parent2.email,
      parentPhone: parent2.phoneNumber,
    },
  })

  // Create independent child users
  const independentChild = await prisma.user.create({
    data: {
      name: 'Omar Mahmoud',
      email: 'omar.mahmoud@example.com',
      password: independentChildPassword,
      userType: 'INDEPENDENT_CHILD',
      phoneNumber: '+201234567894',
      dateOfBirth: new Date('2005-01-01'),
    },
  })

  // Use existing forum sections
  const parentsTeensSection = 'cmapoiuo40003uwysvkipm6d6'
  const parentsOnlySection = 'cmapt7vem0001ub00b66zqvb2'

  // Create forum posts
  const parentPost = await prisma.forumPost.create({
    data: {
      title: 'Tips for Teen Communication',
      content: 'Here are some tips that have worked for me in communicating with my teens...',
      authorId: parent1.id,
      sectionId: parentsOnlySection,
    },
  })

  const teenPost = await prisma.forumPost.create({
    data: {
      title: 'Dealing with Peer Pressure',
      content: 'I\'ve been feeling a lot of pressure from my friends lately...',
      authorId: child1.id,
      sectionId: parentsTeensSection,
    },
  })

  // Create forum replies
  await prisma.forumReply.create({
    data: {
      content: 'That\'s a great tip! I\'ll try that with my kids.',
      authorId: parent2.id,
      postId: parentPost.id,
    },
  })

  await prisma.forumReply.create({
    data: {
      content: 'I understand how you feel. Have you tried talking to your parents about it?',
      authorId: independentChild.id,
      postId: teenPost.id,
    },
  })

  // Create incidents with various types and Cairo locations
  const incidents = [
    {
      type: IncidentType.EMOTIONAL_ABUSE,
      location: 'El Rehab City, New Cairo',
      description: 'Student reported emotional bullying and name-calling at school',
      latitude: 30.0444,
      longitude: 31.4947,
      ipAddress: '192.168.1.1',
      name: 'Anonymous Student',
      contact: 'school@example.com',
      reporterId: child1.id,
    },
    {
      type: IncidentType.PHYSICAL_ABUSE,
      location: 'Al-Azhar Park, Cairo',
      description: 'Witnessed physical altercation between teens',
      latitude: 30.0451,
      longitude: 31.2622,
      ipAddress: '192.168.1.2',
      name: 'Concerned Parent',
      contact: 'parent@example.com',
      reporterId: parent1.id,
    },
    {
      type: IncidentType.SEXUAL_ABUSE,
      location: 'Cairo International School, Maadi',
      description: 'Inappropriate behavior reported in school premises',
      latitude: 29.9627,
      longitude: 31.2597,
      ipAddress: '192.168.1.3',
      name: 'School Staff',
      contact: 'staff@school.edu.eg',
      reporterId: child2.id,
    },
    {
      type: IncidentType.NEGLECT,
      location: 'Maadi, Cairo',
      description: 'Child left unsupervised for extended periods',
      latitude: 29.9627,
      longitude: 31.2597,
      ipAddress: '192.168.1.4',
      name: 'Neighbor',
      contact: 'neighbor@example.com',
      reporterId: parent2.id,
    },
    {
      type: IncidentType.OTHER,
      location: 'City Stars Mall, Heliopolis',
      description: 'Suspicious behavior towards minors',
      latitude: 30.0972,
      longitude: 31.3428,
      ipAddress: '192.168.1.5',
      name: 'Security Guard',
      contact: 'security@mall.com',
      reporterId: independentChild.id,
    },
    {
      type: IncidentType.EMOTIONAL_ABUSE,
      location: 'Zamalek, Cairo',
      description: 'Bullying incident reported by student',
      latitude: 30.0588,
      longitude: 31.2288,
      ipAddress: '192.168.1.6',
      name: 'School Counselor',
      contact: 'counselor@school.edu.eg',
      reporterId: child1.id,
    },
    {
      type: IncidentType.PHYSICAL_ABUSE,
      location: 'Nasr City, Cairo',
      description: 'Physical altercation in school playground',
      latitude: 30.0626,
      longitude: 31.3357,
      ipAddress: '192.168.1.7',
      name: 'School Teacher',
      contact: 'teacher@school.edu.eg',
      reporterId: parent2.id,
    },
    {
      type: IncidentType.SEXUAL_ABUSE,
      location: 'Cairo American College, Maadi',
      description: 'Inappropriate behavior reported in school library',
      latitude: 29.9627,
      longitude: 31.2597,
      ipAddress: '192.168.1.8',
      name: 'Librarian',
      contact: 'library@school.edu.eg',
      reporterId: child2.id,
    }
  ]

  // Create incidents and their corresponding alerts
  for (const incidentData of incidents) {
    const incident = await prisma.incident.create({
      data: incidentData
    })

    // Create an alert for each incident
    await prisma.alert.create({
      data: {
        incidentId: incident.id,
        familyId: incidentData.reporterId === child1.id || incidentData.reporterId === parent1.id 
          ? family1.code 
          : family2.code,
        isResolved: Math.random() > 0.5, // Randomly set some alerts as resolved
      },
    })
  }

  console.log('Database has been seeded with example data!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 