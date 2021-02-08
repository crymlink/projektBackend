import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { Module } from '@nestjs/common';
import { SessionSchema } from './schemas/session.schema';
import { Session } from 'inspector';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
