"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedWalletData() {
    try {
        console.log('🌱 Starting wallet data seeding...\n');
        const sampleCustomers = [
            {
                customerId: '68b80a76dfa2e1443088d758',
                initialBalance: 100.0,
            },
            {
                customerId: '68b8120312710d6d11c1af6b',
                initialBalance: 100.0,
            },
            {
                customerId: '68b814e124a0aee802da7a09',
                initialBalance: 50.0,
            },
            {
                customerId: '68b814e124a0aee802da7a0a',
                initialBalance: 75.0,
            },
            {
                customerId: '68b814e124a0aee802da7a0b',
                initialBalance: 25.0,
            },
            {
                customerId: '68b814e124a0aee802da7a0c',
                initialBalance: 150.0,
            },
        ];
        console.log('📝 Creating wallets...');
        for (const customer of sampleCustomers) {
            const existingWallet = await prisma.wallet.findUnique({
                where: { customerId: customer.customerId },
            });
            if (existingWallet) {
                console.log(`⚠️  Wallet already exists for customer ${customer.customerId}`);
                continue;
            }
            const wallet = await prisma.wallet.create({
                data: {
                    customerId: customer.customerId,
                    balance: customer.initialBalance,
                },
            });
            console.log(`✅ Created wallet for customer ${customer.customerId} with balance: $${customer.initialBalance}`);
            if (customer.initialBalance > 0) {
                await prisma.transaction.create({
                    data: {
                        walletId: wallet.id,
                        customerId: customer.customerId,
                        amount: customer.initialBalance,
                        type: 'credit',
                        description: 'Initial wallet balance',
                        reference: 'initial_balance',
                    },
                });
            }
        }
        console.log('\n💰 Creating sample transactions...');
        const wallets = await prisma.wallet.findMany();
        for (const wallet of wallets) {
            const sampleTransactions = [
                {
                    amount: 15.50,
                    type: 'debit',
                    description: 'Bike charging session',
                    reference: 'charging_session_001',
                },
                {
                    amount: 8.75,
                    type: 'debit',
                    description: 'Bike charging session',
                    reference: 'charging_session_002',
                },
                {
                    amount: 25.00,
                    type: 'credit',
                    description: 'Wallet top-up',
                    reference: 'top_up_001',
                },
                {
                    amount: 12.30,
                    type: 'debit',
                    description: 'Bike charging session',
                    reference: 'charging_session_003',
                },
                {
                    amount: 30.00,
                    type: 'credit',
                    description: 'Wallet top-up',
                    reference: 'top_up_002',
                },
            ];
            let newBalance = wallet.balance;
            for (const transaction of sampleTransactions) {
                if (transaction.type === 'credit') {
                    newBalance += transaction.amount;
                }
                else {
                    newBalance -= transaction.amount;
                }
                await prisma.transaction.create({
                    data: {
                        walletId: wallet.id,
                        customerId: wallet.customerId,
                        amount: transaction.amount,
                        type: transaction.type,
                        description: transaction.description,
                        reference: transaction.reference,
                        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
                    },
                });
            }
            await prisma.wallet.update({
                where: { id: wallet.id },
                data: { balance: newBalance },
            });
            console.log(`✅ Created ${sampleTransactions.length} transactions for customer ${wallet.customerId}. New balance: $${newBalance.toFixed(2)}`);
        }
        const totalWallets = await prisma.wallet.count();
        const totalTransactions = await prisma.transaction.count();
        const totalBalance = await prisma.wallet.aggregate({
            _sum: { balance: true },
        });
        console.log('\n📊 Wallet Seeding Summary:');
        console.log(`  Total Wallets: ${totalWallets}`);
        console.log(`  Total Transactions: ${totalTransactions}`);
        console.log(`  Total Balance Across All Wallets: $${totalBalance._sum.balance?.toFixed(2) || '0.00'}`);
        console.log('\n🎉 Wallet data seeding completed successfully!');
    }
    catch (error) {
        console.error('❌ Error seeding wallet data:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
seedWalletData();
//# sourceMappingURL=seed.js.map