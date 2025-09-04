import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async addFunds(
    customerId: string,
    amount: number,
    paymentMethod: string,
    reference?: string,
    description?: string,
  ) {
    try {
      // Validate amount
      if (amount <= 0) {
        return {
          success: false,
          newBalance: 0,
          transactionId: '',
          message: 'Amount must be greater than zero',
        };
      }

      // Check if wallet exists
      const wallet = await this.prisma.wallet.findUnique({
        where: { customerId },
      });

      if (!wallet) {
        return {
          success: false,
          newBalance: 0,
          transactionId: '',
          message: 'Wallet not found',
        };
      }

      // Update wallet balance
      const updatedWallet = await this.prisma.wallet.update({
        where: { customerId },
        data: { balance: wallet.balance + amount },
      });

      // Create transaction record with payment method
      const transaction = await this.prisma.transaction.create({
        data: {
          walletId: wallet.id,
          customerId,
          amount,
          type: 'credit',
          description: description || `Funds added via ${paymentMethod}`,
          reference: reference || `payment_${paymentMethod}_${Date.now()}`,
        },
      });

      return {
        success: true,
        newBalance: updatedWallet.balance,
        transactionId: transaction.id,
        message: `Successfully added $${amount.toFixed(2)} via ${paymentMethod}`,
        paymentMethod,
        reference: transaction.reference,
      };
    } catch (error) {
      console.error('Error adding funds:', error);
      
      // Check if it's a database connection error
      if (error.code === 'P1001' || error.message?.includes('connect')) {
        return {
          success: false,
          newBalance: 0,
          transactionId: '',
          message: 'Database connection error. Please try again later.',
          error: 'Database unavailable',
        };
      }
      
      return {
        success: false,
        newBalance: 0,
        transactionId: '',
        message: 'Failed to add funds',
        error: error.message,
      };
    }
  }

  async getWalletBalance(customerId: string) {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { customerId },
      });

      if (!wallet) {
        return {
          success: false,
          balance: 0,
          message: 'Wallet not found',
        };
      }

      return {
        success: true,
        balance: wallet.balance,
        message: 'Wallet balance retrieved successfully',
      };
    } catch (error) {
      console.error('Error retrieving wallet balance:', error);
      
      // Check if it's a database connection error
      if (error.code === 'P1001' || error.message?.includes('connect')) {
        return {
          success: false,
          balance: 0,
          message: 'Database connection error. Please try again later.',
          error: 'Database unavailable',
        };
      }
      
      return {
        success: false,
        balance: 0,
        message: 'Failed to retrieve wallet balance',
        error: error.message,
      };
    }
  }

  async getTransactions(
    customerId: string,
    page: number = 1,
    limit: number = 10,
    type?: string,
  ) {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { customerId },
      });

      if (!wallet) {
        return {
          success: false,
          transactions: [],
          total: 0,
          page,
          limit,
          message: 'Wallet not found',
        };
      }

      const skip = (page - 1) * limit;

      // Build where conditions
      const whereConditions: any = { customerId };
      if (type) {
        whereConditions.type = type;
      }

      const [transactions, total] = await Promise.all([
        this.prisma.transaction.findMany({
          where: whereConditions,
          skip,
          take: limit,
          orderBy: { timestamp: 'desc' },
        }),
        this.prisma.transaction.count({
          where: whereConditions,
        }),
      ]);

      return {
        success: true,
        transactions: transactions.map(t => ({
          id: t.id,
          customerId: t.customerId,
          amount: t.amount,
          type: t.type,
          description: t.description,
          reference: t.reference || '',
          chargingSessionId: t.chargingSessionId || '',
          timestamp: t.timestamp.toISOString(),
        })),
        total,
        page,
        limit,
        message: 'Transactions retrieved successfully',
      };
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      
      // Check if it's a database connection error
      if (error.code === 'P1001' || error.message?.includes('connect')) {
        return {
          success: false,
          transactions: [],
          total: 0,
          page,
          limit,
          message: 'Database connection error. Please try again later.',
          error: 'Database unavailable',
        };
      }
      
      return {
        success: false,
        transactions: [],
        total: 0,
        page,
        limit,
        message: 'Failed to retrieve transactions',
        error: error.message,
      };
    }
  }

  async getWalletSummary(customerId: string) {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { customerId },
        include: {
          transactions: {
            orderBy: { timestamp: 'desc' },
            take: 1,
          },
        },
      });

      if (!wallet) {
        return {
          success: false,
          summary: null,
          message: 'Wallet not found',
        };
      }

      // Get transaction statistics
      const [totalTransactions, totalCredits, totalDebits] = await Promise.all([
        this.prisma.transaction.count({ where: { customerId } }),
        this.prisma.transaction.aggregate({
          where: { customerId, type: 'credit' },
          _sum: { amount: true },
        }),
        this.prisma.transaction.aggregate({
          where: { customerId, type: 'debit' },
          _sum: { amount: true },
        }),
      ]);

      const summary = {
        walletId: wallet.id,
        customerId: wallet.customerId,
        balance: wallet.balance,
        totalTransactions,
        totalCredits: totalCredits._sum.amount || 0,
        totalDebits: totalDebits._sum.amount || 0,
        lastTransactionDate: wallet.transactions[0]?.timestamp.toISOString() || '',
      };

      return {
        success: true,
        summary,
        message: 'Wallet summary retrieved successfully',
      };
    } catch (error) {
      console.error('Error retrieving wallet summary:', error);
      
      // Check if it's a database connection error
      if (error.code === 'P1001' || error.message?.includes('connect')) {
        return {
          success: false,
          summary: null,
          message: 'Database connection error. Please try again later.',
          error: 'Database unavailable',
        };
      }
      
      return {
        success: false,
        summary: null,
        message: 'Failed to retrieve wallet summary',
        error: error.message,
      };
    }
  }

  async getWallet(customerId: string) {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: { customerId },
      });

      if (!wallet) {
        return {
          success: false,
          walletId: '',
          balance: 0,
          customerId: '',
          message: 'Wallet not found',
        };
      }

      return {
        success: true,
        walletId: wallet.id,
        balance: wallet.balance,
        customerId: wallet.customerId,
        message: 'Wallet retrieved successfully',
      };
    } catch (error) {
      console.error('Error retrieving wallet:', error);
      
      // Check if it's a database connection error
      if (error.code === 'P1001' || error.message?.includes('connect')) {
        return {
          success: false,
          walletId: '',
          balance: 0,
          customerId: '',
          message: 'Database connection error. Please try again later.',
          error: 'Database unavailable',
        };
      }
      
      return {
        success: false,
        walletId: '',
        balance: 0,
        customerId: '',
        message: 'Failed to retrieve wallet',
        error: error.message,
      };
    }
  }

  // New method to create wallet for a customer
  async createWallet(customerId: string, initialBalance: number = 0) {
    try {
      // Check if wallet already exists
      const existingWallet = await this.prisma.wallet.findUnique({
        where: { customerId },
      });

      if (existingWallet) {
        return {
          success: false,
          walletId: '',
          message: 'Wallet already exists for this customer',
        };
      }

      // Create new wallet
      const wallet = await this.prisma.wallet.create({
        data: {
          customerId,
          balance: initialBalance,
        },
      });

      // If initial balance > 0, create initial transaction
      if (initialBalance > 0) {
        await this.prisma.transaction.create({
          data: {
            walletId: wallet.id,
            customerId,
            amount: initialBalance,
            type: 'credit',
            description: 'Initial wallet balance',
            reference: `initial_balance_${Date.now()}`,
          },
        });
      }

      return {
        success: true,
        walletId: wallet.id,
        balance: wallet.balance,
        message: 'Wallet created successfully',
      };
    } catch (error) {
      console.error('Error creating wallet:', error);
      return {
        success: false,
        walletId: '',
        message: 'Failed to create wallet',
        error: error.message,
      };
    }
  }

  // New method to deduct balance for charging sessions
  async deductBalance(customerId: string, amount: number, chargingSessionId: string, description?: string) {
    try {
      // Validate amount
      if (amount <= 0) {
        return {
          success: false,
          newBalance: 0,
          transactionId: '',
          message: 'Amount must be greater than zero',
        };
      }

      // Check if wallet exists
      const wallet = await this.prisma.wallet.findUnique({
        where: { customerId },
      });

      if (!wallet) {
        return {
          success: false,
          newBalance: 0,
          transactionId: '',
          message: 'Wallet not found',
        };
      }

      // Check if sufficient balance
      if (wallet.balance < amount) {
        return {
          success: false,
          newBalance: wallet.balance,
          transactionId: '',
          message: 'Insufficient balance',
          requiredAmount: amount,
          currentBalance: wallet.balance,
        };
      }

      // Update wallet balance
      const updatedWallet = await this.prisma.wallet.update({
        where: { customerId },
        data: { balance: wallet.balance - amount },
      });

      // Create transaction record
      const transaction = await this.prisma.transaction.create({
        data: {
          walletId: wallet.id,
          customerId,
          amount,
          type: 'debit',
          description: description || `Charging session payment`,
          reference: `charging_session_${chargingSessionId}`,
          chargingSessionId,
        },
      });

      return {
        success: true,
        newBalance: updatedWallet.balance,
        transactionId: transaction.id,
        message: `Successfully deducted $${amount.toFixed(2)} for charging session`,
        chargingSessionId,
      };
    } catch (error) {
      console.error('Error deducting balance:', error);
      return {
        success: false,
        newBalance: 0,
        transactionId: '',
        message: 'Failed to deduct balance',
        error: error.message,
      };
    }
  }
}
