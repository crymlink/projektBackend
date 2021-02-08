import { SessionModule } from './session/session.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SessionModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
