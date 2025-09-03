import { Module } from '@nestjs/common';
import { ChargingSessionsController } from './charging-sessions.controller';
import { ChargingSessionsService } from './charging-sessions.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ChargingSessionsController],
  providers: [ChargingSessionsService],
  exports: [ChargingSessionsService],
})
export class ChargingSessionsModule {}
