const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createWalletForAlisha() {
  try {
    console.log('Creating wallet for Alisha...');
    
    // Check if wallet already exists
    const existingWallet = await prisma.wallet.findUnique({
      where: { customerId: '68b80a76dfa2e1443088d758' },
    });

    if (existingWallet) {
      console.log('Wallet already exists for Alisha:', existingWallet);
      return existingWallet;
    }

    // Create wallet
    const wallet = await prisma.wallet.create({
      data: {
        customerId: '68b80a76dfa2e1443088d758',
        balance: 100.0,
      },
    });

    console.log('✅ Created wallet for Alisha:', wallet);

    // Create initial transaction
    const transaction = await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        customerId: '68b80a76dfa2e1443088d758',
        amount: 100.0,
        type: 'credit',
        description: 'Initial wallet balance',
        reference: 'initial_balance',
      },
    });

    console.log('✅ Created initial transaction:', transaction);
    
    return wallet;
  } catch (error) {
    console.error('❌ Error creating wallet:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createWalletForAlisha();
