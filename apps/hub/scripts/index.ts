import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Starting database seeding...');

    // Create a customer
    const hashedPassword = await bcrypt.hash('customer123', 5);
    const customer = await prisma.customer.create({
      data: {
        firstName: 'John',
        lastName: 'Customer',
        email: 'john.customer@example.com',
        password: hashedPassword,
        phone: '+1234567890',
        address: '123 Customer St, City, State 12345',
      },
    });

    console.log('Customer created:', customer.email);

    // Create bikes
    const bike1 = await prisma.bike.create({
      data: {
        serialNumber: 'BIKE001',
        brand: 'Trek',
        model: 'Mountain Bike Pro',
        status: 'AVAILABLE',
      },
    });

    const bike2 = await prisma.bike.create({
      data: {
        serialNumber: 'BIKE002',
        brand: 'Giant',
        model: 'City Cruiser',
        status: 'AVAILABLE',
      },
    });

    const bike3 = await prisma.bike.create({
      data: {
        serialNumber: 'BIKE003',
        brand: 'Specialized',
        model: 'Electric Bike',
        status: 'MAINTENANCE',
      },
    });

    console.log('Bikes created:', [bike1.serialNumber, bike2.serialNumber, bike3.serialNumber]);

    // Create an admin to assign bikes
    const admin = await prisma.admin.findFirst({
      where: { email: 'admin@yatritask.com' },
    });

    if (admin) {
      // Assign a bike to the customer
      const assignment = await prisma.bikeAssignment.create({
        data: {
          bikeId: bike1.id,
          customerId: customer.id,
          assignedBy: admin.id,
        },
      });

      console.log('Bike assignment created:', assignment.id);

      // Update bike status
      await prisma.bike.update({
        where: { id: bike1.id },
        data: { status: 'ASSIGNED' },
      });
    }

    // Create charging sessions
    const chargingSession1 = await prisma.chargingSession.create({
      data: {
        customerId: customer.id,
        bikeId: bike1.id,
        amount: 5.50,
        startTime: new Date('2024-01-09T10:00:00Z'),
        endTime: new Date('2024-01-09T11:30:00Z'),
        status: 'COMPLETED',
      },
    });

    const chargingSession2 = await prisma.chargingSession.create({
      data: {
        customerId: customer.id,
        bikeId: bike2.id,
        amount: 3.25,
        startTime: new Date('2024-01-09T14:00:00Z'),
        endTime: null,
        status: 'ACTIVE',
      },
    });

    console.log('Charging sessions created:', [chargingSession1.id, chargingSession2.id]);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
