"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function seed() {
    try {
        console.log('Starting database seeding...');
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
        const admin = await prisma.admin.findFirst({
            where: { email: 'admin@yatritask.com' },
        });
        if (admin) {
            const assignment = await prisma.bikeAssignment.create({
                data: {
                    bikeId: bike1.id,
                    customerId: customer.id,
                    assignedBy: admin.id,
                },
            });
            console.log('Bike assignment created:', assignment.id);
            await prisma.bike.update({
                where: { id: bike1.id },
                data: { status: 'ASSIGNED' },
            });
        }
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
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
seed();
//# sourceMappingURL=index.js.map