import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomerProfileController } from './customer-profile.controller';
import { CustomersService } from './customers.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { WalletGrpcService } from '../common/grpc/wallet-grpc.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CustomersController, CustomerProfileController],
  providers: [CustomersService, WalletGrpcService],
  exports: [CustomersService],
})
export class CustomersModule {}
