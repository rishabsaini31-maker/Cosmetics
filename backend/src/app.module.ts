import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [HomepageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
