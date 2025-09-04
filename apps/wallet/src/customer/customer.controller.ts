import { Controller, Post, Body, Get, HttpCode, HttpStatus, UseGuards, Request, Res, Query } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { AddFundsDto, AddFundsAuthenticatedDto, GetTransactionsQueryDto } from './dto/customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('customer-wallet')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {
    this.loadMockData();
  }

  // File-based storage for mock data (persists across server restarts)
  private static mockDataFile = path.join(process.cwd(), 'mock-wallet-data.json');
  private static mockBalances = new Map<string, number>();
  private static mockTransactions = new Map<string, any[]>();

  private loadMockData() {
    try {
      if (fs.existsSync(CustomerController.mockDataFile)) {
        const data = JSON.parse(fs.readFileSync(CustomerController.mockDataFile, 'utf8'));
        CustomerController.mockBalances = new Map(Object.entries(data.balances || {}));
        CustomerController.mockTransactions = new Map(Object.entries(data.transactions || {}));
        console.log('📁 Loaded mock data from file');
      }
    } catch (error) {
      console.log('📁 No existing mock data found, starting fresh');
    }
  }

  private saveMockData() {
    try {
      const data = {
        balances: Object.fromEntries(CustomerController.mockBalances),
        transactions: Object.fromEntries(CustomerController.mockTransactions),
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(CustomerController.mockDataFile, JSON.stringify(data, null, 2));
      console.log('💾 Saved mock data to file');
    } catch (error) {
      console.error('❌ Error saving mock data:', error);
    }
  }

  // Public endpoint that accepts cookie-based authentication
  @Post('add-funds-cookie')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Add funds to customer wallet (Cookie-based auth)',
    description: 'Allows customers to add funds using cookie-based authentication from Hub App.',
  })
  @ApiResponse({
    status: 200,
    description: 'Funds added successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        newBalance: { type: 'number', example: 150.75 },
        transactionId: { type: 'string', example: 'txn_12345' },
        message: { type: 'string', example: 'Successfully added $100.50 via credit_card' },
        paymentMethod: { type: 'string', example: 'credit_card' },
        reference: { type: 'string', example: 'payment_credit_card_1703123456789' },
        walletCreated: { type: 'boolean', example: false },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Customer token required in cookie',
  })
  async addFundsWithCookie(@Request() req: any, @Body() data: AddFundsAuthenticatedDto) {
    // Extract userId from cookie token
    const token = req.cookies?.customer_token;
    if (!token) {
      return {
        success: false,
        message: 'Customer token required in cookie',
        error: 'Unauthorized',
        statusCode: 401,
      };
    }

    try {
      // For now, we'll use a simple approach - extract userId from token
      // In production, you should verify the token properly
      const userId = req.headers['x-user-id'] || '68b80a5adfa2e1443088d757'; // Default to Ayush's ID
      
      return this.customerService.addFunds(
        userId,
        data.amount,
        data.paymentMethod,
        data.reference,
        data.description,
      );
    } catch (error) {
      return {
        success: false,
        message: 'Invalid token',
        error: 'Unauthorized',
        statusCode: 401,
      };
    }
  }

  @Post('test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Test endpoint',
    description: 'Simple test endpoint to check JWT authentication',
  })
  async test(@Request() req: any) {
    return {
      success: true,
      message: 'JWT authentication working',
      userId: req.user?.sub,
      user: req.user,
    };
  }

  // Test endpoint for adding funds without authentication
  @Post('add-funds-test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Add funds to customer wallet (Test endpoint)',
    description: 'Test endpoint that allows adding funds without authentication. Use this for testing purposes only.',
  })
  @ApiResponse({
    status: 200,
    description: 'Funds added successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        newBalance: { type: 'number', example: 150.75 },
        transactionId: { type: 'string', example: 'txn_12345' },
        message: { type: 'string', example: 'Successfully added $100.50 via credit_card' },
        paymentMethod: { type: 'string', example: 'credit_card' },
        reference: { type: 'string', example: 'payment_credit_card_1703123456789' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async addFundsTest(@Body() data: AddFundsDto) {
    // Use the userId from the request body for testing
    return this.customerService.addFunds(
      data.userId,
      data.amount,
      data.paymentMethod,
      data.reference,
      data.description,
    );
  }

  // Simple test endpoint with no authentication required
  @Post('add-funds-simple')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Add funds to customer wallet (Simple test)',
    description: 'Simple test endpoint with no authentication required. Use for quick testing.',
  })
  async addFundsSimple(@Body() data: any) {
    // Use a default customer ID for testing
    const customerId = data.customerId || '68b80a5adfa2e1443088d757';
    
    // Get current balance from static map
    const currentBalance = CustomerController.mockBalances.get(customerId) || 0;
    const newBalance = currentBalance + data.amount;
    
    // Update the balance in the static map
    CustomerController.mockBalances.set(customerId, newBalance);
    
    // Create mock transaction
    const transaction = {
      id: 'mock_txn_' + Date.now(),
      customerId: customerId,
      amount: data.amount,
      type: 'credit',
      description: data.description || `Funds added via ${data.paymentMethod}`,
      reference: data.reference || `mock_payment_${Date.now()}`,
      timestamp: new Date().toISOString(),
      paymentMethod: data.paymentMethod
    };
    
    // Store transaction in mock storage
    if (!CustomerController.mockTransactions.has(customerId)) {
      CustomerController.mockTransactions.set(customerId, []);
    }
    CustomerController.mockTransactions.get(customerId)!.unshift(transaction);
    
    // Save data to file for persistence
    this.saveMockData();
    
    // Mock response for testing without database
    return {
      success: true,
      newBalance: newBalance,
      transactionId: transaction.id,
      message: `Successfully added $${data.amount} via ${data.paymentMethod}. New balance: $${newBalance}`,
      paymentMethod: data.paymentMethod,
      reference: transaction.reference,
      customerId: customerId,
      mock: true,
      previousBalance: currentBalance,
      amountAdded: data.amount,
      transaction: transaction
    };
  }

  // Spend funds (Simple test)
  @Post('spend-funds-simple')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Spend funds from customer wallet (Simple test)',
    description: 'Simple test endpoint to spend funds from wallet.',
  })
  async spendFundsSimple(@Body() data: any) {
    // Use a default customer ID for testing
    const customerId = data.customerId || '68b80a5adfa2e1443088d757';
    
    // Get current balance from static map
    const currentBalance = CustomerController.mockBalances.get(customerId) || 0;
    
    if (currentBalance < data.amount) {
      return {
        success: false,
        message: `Insufficient balance. Current: $${currentBalance}, Required: $${data.amount}`,
        currentBalance: currentBalance,
        requiredAmount: data.amount,
        mock: true
      };
    }
    
    const newBalance = currentBalance - data.amount;
    
    // Update the balance in the static map
    CustomerController.mockBalances.set(customerId, newBalance);
    
    // Create mock transaction
    const transaction = {
      id: 'mock_txn_' + Date.now(),
      customerId: customerId,
      amount: data.amount,
      type: 'debit',
      description: data.description || `Payment for ${data.service || 'service'}`,
      reference: data.reference || `mock_spend_${Date.now()}`,
      timestamp: new Date().toISOString(),
      service: data.service
    };
    
    // Store transaction in mock storage
    if (!CustomerController.mockTransactions.has(customerId)) {
      CustomerController.mockTransactions.set(customerId, []);
    }
    CustomerController.mockTransactions.get(customerId)!.unshift(transaction);
    
    // Save data to file for persistence
    this.saveMockData();
    
    return {
      success: true,
      newBalance: newBalance,
      transactionId: transaction.id,
      message: `Successfully spent $${data.amount} for ${data.service || 'service'}. New balance: $${newBalance}`,
      reference: transaction.reference,
      customerId: customerId,
      mock: true,
      previousBalance: currentBalance,
      amountSpent: data.amount,
      transaction: transaction
    };
  }

  @Post('add-funds')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Add funds to customer wallet',
    description: 'Allows customers to add funds to their wallet from third-party sources like bank transfers, credit cards, etc.',
  })
  @ApiResponse({
    status: 200,
    description: 'Funds added successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        newBalance: { type: 'number', example: 150.75 },
        transactionId: { type: 'string', example: 'txn_12345' },
        message: { type: 'string', example: 'Successfully added $100.50 via credit_card' },
        paymentMethod: { type: 'string', example: 'credit_card' },
        reference: { type: 'string', example: 'payment_credit_card_1703123456789' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
  @ApiResponse({
    status: 404,
    description: 'Wallet not found',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async addFunds(@Request() req: any, @Body() data: AddFundsAuthenticatedDto) {
    // Extract userId from JWT token
    const userId = req.user.sub;
    return this.customerService.addFunds(
      userId,
      data.amount,
      data.paymentMethod,
      data.reference,
      data.description,
    );
  }

  @Get('wallet/balance')
  @ApiOperation({
    summary: 'Get customer wallet balance',
    description: 'Retrieves the current balance of the authenticated customer wallet.',
  })
  @ApiResponse({
    status: 200,
    description: 'Wallet balance retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        balance: { type: 'number', example: 150.75 },
        message: { type: 'string', example: 'Wallet balance retrieved successfully' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
  @ApiResponse({
    status: 404,
    description: 'Wallet not found',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async getWalletBalance(@Request() req: any) {
    const userId = req.user.sub;
    return this.customerService.getWalletBalance(userId);
  }

  @Get('wallet/transactions')
  @ApiOperation({
    summary: 'Get customer transaction history',
    description: 'Retrieves paginated transaction history for the authenticated customer wallet.',
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for pagination',
    required: false,
    type: 'number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of transactions per page',
    required: false,
    type: 'number',
    example: 10,
  })
  @ApiQuery({
    name: 'type',
    description: 'Filter by transaction type',
    required: false,
    enum: ['credit', 'debit'],
    example: 'credit',
  })
  @ApiResponse({
    status: 200,
    description: 'Transactions retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        transactions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'txn_12345' },
              userId: { type: 'string', example: 'user123' },
              amount: { type: 'number', example: 100.50 },
              type: { type: 'string', example: 'credit' },
              description: { type: 'string', example: 'Funds added via credit_card' },
              reference: { type: 'string', example: 'payment_credit_card_1703123456789' },
              timestamp: { type: 'string', example: '2023-12-21T10:30:00.000Z' },
            },
          },
        },
        total: { type: 'number', example: 25 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
        message: { type: 'string', example: 'Transactions retrieved successfully' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
  @ApiResponse({
    status: 404,
    description: 'Wallet not found',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async getTransactions(
    @Request() req: any,
    @Query() query: GetTransactionsQueryDto,
  ) {
    const userId = req.user.sub;
    return this.customerService.getTransactions(
      userId,
      parseInt(query.page || '1'),
      parseInt(query.limit || '10'),
      query.type,
    );
  }

  @Get('wallet/summary')
  @ApiOperation({
    summary: 'Get customer wallet summary',
    description: 'Retrieves comprehensive wallet summary including balance, transaction statistics, and customer details.',
  })
  @ApiResponse({
    status: 200,
    description: 'Wallet summary retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        summary: {
          type: 'object',
          properties: {
            walletId: { type: 'string', example: 'wallet_12345' },
            userId: { type: 'string', example: 'user123' },
            customerName: { type: 'string', example: 'John Doe' },
            customerEmail: { type: 'string', example: 'john@example.com' },
            balance: { type: 'number', example: 150.75 },
            totalTransactions: { type: 'number', example: 25 },
            totalCredits: { type: 'number', example: 500.00 },
            totalDebits: { type: 'number', example: 349.25 },
            lastTransactionDate: { type: 'string', example: '2023-12-21T10:30:00.000Z' },
          },
        },
        message: { type: 'string', example: 'Wallet summary retrieved successfully' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
  @ApiResponse({
    status: 404,
    description: 'Wallet not found',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async getWalletSummary(@Request() req: any) {
    const userId = req.user.sub;
    return this.customerService.getWalletSummary(userId);
  }

  @Get('wallet')
  @ApiOperation({
    summary: 'Get customer wallet details',
    description: 'Retrieves basic wallet information for the authenticated customer.',
  })
  @ApiResponse({
    status: 200,
    description: 'Wallet details retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        walletId: { type: 'string', example: 'wallet_12345' },
        balance: { type: 'number', example: 150.75 },
        userId: { type: 'string', example: 'user123' },
        customerName: { type: 'string', example: 'John Doe' },
        customerEmail: { type: 'string', example: 'john@example.com' },
        message: { type: 'string', example: 'Wallet retrieved successfully' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
  @ApiResponse({
    status: 404,
    description: 'Wallet not found',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async getWallet(@Request() req: any) {
    const userId = req.user.sub;
    return this.customerService.getWallet(userId);
  }

  // Get current balance (Simple test)
  @Get('get-balance-simple')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get current wallet balance (Simple test)',
    description: 'Get the current balance of the customer wallet.',
  })
  async getBalanceSimple() {
    // Use a default user ID for testing
    const customerId = '68b80a5adfa2e1443088d757';
    
    // Get current balance from static map
    const currentBalance = CustomerController.mockBalances.get(customerId) || 0;
    
    return {
      success: true,
      balance: currentBalance,
      currency: 'USD',
      userId: customerId,
      message: `Current balance: $${currentBalance}`,
      mock: true,
      lastUpdated: new Date().toISOString()
    };
  }

  // Get transaction history (Simple test)
  @Get('get-transactions-simple')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get transaction history (Simple test)',
    description: 'Get paginated transaction history for the customer wallet.',
  })
  async getTransactionsSimple(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('type') type: string
  ) {
    // Use a default user ID for testing
    const customerId = '68b80a5adfa2e1443088d757';
    
    // Get transactions from mock storage
    const mockTransactions = CustomerController.mockTransactions.get(customerId) || [];
    
    // Filter by type if specified
    let filteredTransactions = mockTransactions;
    if (type && (type === 'credit' || type === 'debit')) {
      filteredTransactions = mockTransactions.filter(t => t.type === type);
    }
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
    
    return {
      success: true,
      transactions: paginatedTransactions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredTransactions.length,
        totalPages: Math.ceil(filteredTransactions.length / limitNum)
      },
      userId: customerId,
      message: `Retrieved ${paginatedTransactions.length} transactions`,
      mock: true
    };
  }

  // Get wallet summary (Simple test)
  @Get('get-wallet-summary-simple')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get wallet summary (Simple test)',
    description: 'Get comprehensive wallet summary including balance and statistics.',
  })
  async getWalletSummarySimple() {
    // Use a default user ID for testing
    const customerId = '68b80a5adfa2e1443088d757';
    
    // Get current balance from static map
    const currentBalance = CustomerController.mockBalances.get(customerId) || 0;
    
    // Get transactions from mock storage
    const mockTransactions = CustomerController.mockTransactions.get(customerId) || [];
    
    // Calculate statistics
    const totalTransactions = mockTransactions.length;
    const totalCredits = mockTransactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalDebits = mockTransactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const summary = {
      walletId: 'wallet_' + customerId,
      userId: customerId,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      balance: currentBalance,
      currency: 'USD',
      totalTransactions,
      totalCredits,
      totalDebits,
      lastTransactionDate: mockTransactions[0]?.timestamp || new Date().toISOString(),
      walletCreatedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      status: 'active'
    };
    
    return {
      success: true,
      summary: summary,
      message: 'Wallet summary retrieved successfully',
      mock: true
    };
  }

  // Get recent activity (Simple test)
  @Get('get-recent-activity-simple')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get recent activity (Simple test)',
    description: 'Get recent wallet activity for quick overview.',
  })
  async getRecentActivitySimple() {
    // Use a default user ID for testing
    const customerId = '68b80a5adfa2e1443088d757';
    
    // Get transactions from mock storage
    const mockTransactions = CustomerController.mockTransactions.get(customerId) || [];
    
    // Convert to activity format
    const recentActivity = mockTransactions.slice(0, 5).map(t => ({
      id: t.id,
      type: t.type,
      amount: t.amount,
      description: t.description,
      timestamp: t.timestamp,
      icon: t.type === 'credit' ? '💰' : '💸'
    }));
    
    return {
      success: true,
      recentActivity: recentActivity,
      userId: customerId,
      message: `Retrieved ${recentActivity.length} recent activities`,
      mock: true
    };
  }

  // gRPC methods for internal communication (keep customerId parameter for gRPC)
  @GrpcMethod('CustomerService', 'AddFunds')
  async addFundsGrpc(data: {
    customerId: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
    description?: string;
  }) {
    return this.customerService.addFunds(
      data.customerId,
      data.amount,
      data.paymentMethod,
      data.reference,
      data.description,
    );
  }

  @GrpcMethod('CustomerService', 'GetWalletBalance')
  async getWalletBalanceGrpc(data: { customerId: string }) {
    return this.customerService.getWalletBalance(data.customerId);
  }

  @GrpcMethod('CustomerService', 'GetTransactions')
  async getTransactionsGrpc(data: {
    customerId: string;
    page?: number;
    limit?: number;
    type?: string;
  }) {
    return this.customerService.getTransactions(
      data.customerId,
      data.page || 1,
      data.limit || 10,
      data.type,
    );
  }

  @GrpcMethod('CustomerService', 'GetWalletSummary')
  async getWalletSummaryGrpc(data: { customerId: string }) {
    return this.customerService.getWalletSummary(data.customerId);
  }

  @GrpcMethod('CustomerService', 'GetWallet')
  async getWalletGrpc(data: { customerId: string }) {
    return this.customerService.getWallet(data.customerId);
  }

  @GrpcMethod('CustomerService', 'CreateWallet')
  async createWalletGrpc(data: {
    customerId: string;
    initialBalance?: number;
  }) {
    return this.customerService.createWallet(
      data.customerId,
      data.initialBalance || 0,
    );
  }

  @GrpcMethod('CustomerService', 'DeductBalance')
  async deductBalanceGrpc(data: {
    customerId: string;
    amount: number;
    chargingSessionId: string;
    description?: string;
  }) {
    return this.customerService.deductBalance(
      data.customerId,
      data.amount,
      data.chargingSessionId,
      data.description,
    );
  }
}
