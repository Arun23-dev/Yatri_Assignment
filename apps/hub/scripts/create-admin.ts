import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: { email: 'admin@yatritask.com' },
    });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 5);

    const admin = await prisma.admin.create({
      data: {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@yatritask.com',
        password: hashedPassword,
      },
    });

    console.log('Admin created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
