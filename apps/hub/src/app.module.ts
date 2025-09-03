import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BikesModule } from './bikes/bikes.module';
import { ChargingSessionsModule } from './charging-sessions/charging-sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env variables available everywhere
    }),
    CustomersModule,
    AuthModule,
    PrismaModule,
    BikesModule,
    ChargingSessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
