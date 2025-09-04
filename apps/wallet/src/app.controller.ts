import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test-wallet-creation')
  async testWalletCreation(@Body() data: any) {
    console.log('🧪 Testing wallet creation with data:', data);
    return {
      success: true,
      message: 'Wallet creation test endpoint working',
      data: data,
      timestamp: new Date().toISOString()
    };
  }
}
