import { Controller, Get, Put, Body } from '@nestjs/common';
import { HomepageService } from './homepage.service';

@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get()
  getHomepageContent() {
    return this.homepageService.getHomepageContent();
  }

  @Put()
  updateHomepageContent(@Body() body: any) {
    return this.homepageService.updateHomepageContent(body);
  }
}
