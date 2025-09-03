import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedChargingSessions() {
  try {
    console.log('🌱 Starting charging sessions seeding...');

    // Get existing customers and bikes
    const customers = await prisma.customer.findMany();
    const bikes = await prisma.bike.findMany();

    if (customers.length === 0 || bikes.length === 0) {
      console.log('❌ No customers or bikes found. Please run the main seed script first.');
      return;
    }

    console.log(`Found ${customers.length} customers and ${bikes.length} bikes`);

    // Sample charging session data
    const chargingSessionsData = [
      // Completed sessions
      {
        customerId: customers[0].id,
        bikeId: bikes[0].id,
        amount: 5.50,
        startTime: new Date('2024-01-09T10:00:00Z'),
        endTime: new Date('2024-01-09T11:30:00Z'),
        status: 'COMPLETED',
      },
      {
        customerId: customers[0].id,
        bikeId: bikes[1].id,
        amount: 3.25,
        startTime: new Date('2024-01-10T14:00:00Z'),
        endTime: new Date('2024-01-10T15:15:00Z'),
        status: 'COMPLETED',
      },
      {
        customerId: customers[1]?.id || customers[0].id,
        bikeId: bikes[2]?.id || bikes[0].id,
        amount: 7.80,
        startTime: new Date('2024-01-11T09:00:00Z'),
        endTime: new Date('2024-01-11T11:00:00Z'),
        status: 'COMPLETED',
      },
      {
        customerId: customers[1]?.id || customers[0].id,
        bikeId: bikes[0].id,
        amount: 4.20,
        startTime: new Date('2024-01-12T16:00:00Z'),
        endTime: new Date('2024-01-12T17:30:00Z'),
        status: 'COMPLETED',
      },
      {
        customerId: customers[0].id,
        bikeId: bikes[1].id,
        amount: 6.75,
        startTime: new Date('2024-01-13T11:00:00Z'),
        endTime: new Date('2024-01-13T13:00:00Z'),
        status: 'COMPLETED',
      },
      // Active sessions
      {
        customerId: customers[0].id,
        bikeId: bikes[2]?.id || bikes[0].id,
        amount: 2.50,
        startTime: new Date('2024-01-14T10:00:00Z'),
        endTime: null,
        status: 'ACTIVE',
      },
      {
        customerId: customers[1]?.id || customers[0].id,
        bikeId: bikes[1].id,
        amount: 3.75,
        startTime: new Date('2024-01-14T14:30:00Z'),
        endTime: null,
        status: 'ACTIVE',
      },
      // Cancelled sessions
      {
        customerId: customers[0].id,
        bikeId: bikes[0].id,
        amount: 1.50,
        startTime: new Date('2024-01-08T15:00:00Z'),
        endTime: new Date('2024-01-08T15:15:00Z'),
        status: 'CANCELLED',
      },
      {
        customerId: customers[1]?.id || customers[0].id,
        bikeId: bikes[1].id,
        amount: 2.00,
        startTime: new Date('2024-01-07T12:00:00Z'),
        endTime: new Date('2024-01-07T12:10:00Z'),
        status: 'CANCELLED',
      },
      // More completed sessions for variety
      {
        customerId: customers[0].id,
        bikeId: bikes[2]?.id || bikes[0].id,
        amount: 8.90,
        startTime: new Date('2024-01-06T08:00:00Z'),
        endTime: new Date('2024-01-06T10:30:00Z'),
        status: 'COMPLETED',
      },
      {
        customerId: customers[1]?.id || customers[0].id,
        bikeId: bikes[0].id,
        amount: 4.60,
        startTime: new Date('2024-01-05T13:00:00Z'),
        endTime: new Date('2024-01-05T14:30:00Z'),
        status: 'COMPLETED',
      },
      {
        customerId: customers[0].id,
        bikeId: bikes[1].id,
        amount: 5.25,
        startTime: new Date('2024-01-04T16:00:00Z'),
        endTime: new Date('2024-01-04T17:45:00Z'),
        status: 'COMPLETED',
      },
    ];

    // Create charging sessions
    const createdSessions: any[] = [];
    for (const sessionData of chargingSessionsData) {
      const session = await prisma.chargingSession.create({
        data: sessionData,
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          bike: {
            select: {
              id: true,
              serialNumber: true,
              brand: true,
              model: true,
            },
          },
        },
      });
      createdSessions.push(session);
      console.log(`✅ Created charging session: ${session.id} - ${session.customer.firstName} ${session.customer.lastName} - ${session.bike.brand} ${session.bike.model} - $${session.amount}`);
    }

    console.log(`\n🎉 Successfully created ${createdSessions.length} charging sessions!`);

    // Display summary
    const summary = await prisma.chargingSession.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
      _sum: {
        amount: true,
      },
    });

    console.log('\n📊 Charging Sessions Summary:');
    summary.forEach((item) => {
      console.log(`  ${item.status}: ${item._count.status} sessions, Total: $${item._sum.amount?.toFixed(2) || '0.00'}`);
    });

    // Get total revenue
    const totalRevenue = await prisma.chargingSession.aggregate({
      where: {
        status: 'COMPLETED',
      },
      _sum: {
        amount: true,
      },
    });

    console.log(`\n💰 Total Revenue (Completed Sessions): $${totalRevenue._sum.amount?.toFixed(2) || '0.00'}`);

  } catch (error) {
    console.error('❌ Error seeding charging sessions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedChargingSessions();
