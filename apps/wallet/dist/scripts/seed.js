"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting wallet seeding...');
    const wallet1 = await prisma.wallet.create({
        data: {
            userId: 'user1',
            customerName: 'John Doe',
            customerEmail: 'john.doe@example.com',
            balance: 100.0,
        },
    });
    const wallet2 = await prisma.wallet.create({
        data: {
            userId: 'user2',
            customerName: 'Jane Smith',
            customerEmail: 'jane.smith@example.com',
            balance: 75.5,
        },
    });
    console.log('Created wallets:', { wallet1: wallet1.id, wallet2: wallet2.id });
    const transaction1 = await prisma.transaction.create({
        data: {
            walletId: wallet1.id,
            userId: 'user1',
            amount: 25.0,
            type: 'debit',
            description: 'Bike rental fee',
        },
    });
    const transaction2 = await prisma.transaction.create({
        data: {
            walletId: wallet1.id,
            userId: 'user1',
            amount: 15.0,
            type: 'debit',
            description: 'Charging session',
        },
    });
    const transaction3 = await prisma.transaction.create({
        data: {
            walletId: wallet2.id,
            userId: 'user2',
            amount: 30.0,
            type: 'debit',
            description: 'Bike rental fee',
        },
    });
    console.log('Created transactions:', [transaction1.id, transaction2.id, transaction3.id]);
    const session1 = await prisma.chargingSession.create({
        data: {
            userId: 'user1',
            bikeId: 'bike1',
            amount: 15.0,
            startTime: new Date('2024-01-01T10:00:00Z'),
            endTime: new Date('2024-01-01T11:00:00Z'),
            status: 'completed',
        },
    });
    const session2 = await prisma.chargingSession.create({
        data: {
            userId: 'user2',
            bikeId: 'bike2',
            amount: 20.0,
            startTime: new Date('2024-01-02T14:00:00Z'),
            endTime: new Date('2024-01-02T15:30:00Z'),
            status: 'completed',
        },
    });
    const session3 = await prisma.chargingSession.create({
        data: {
            userId: 'user1',
            bikeId: 'bike3',
            amount: 12.5,
            startTime: new Date('2024-01-03T09:00:00Z'),
            status: 'active',
        },
    });
    console.log('Created charging sessions:', [session1.id, session2.id, session3.id]);
    console.log('Wallet seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map