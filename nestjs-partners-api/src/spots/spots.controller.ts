import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { SpotsService } from './spots.service';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(@Param('eventId') eventId: string) {
    return this.spotsService.create({
      eventId,
    });
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Get(':spotId')
  findOne(@Param('id') spotId: string, @Param('eventId') eventId: string) {
    return this.spotsService.findOne(eventId, spotId);
  }

  // @Patch(':spotId')
  // update(@Param('id') spotId: string, @Param('eventId') eventId: string) {
  //   return this.spotsService.update(eventId, spotId);
  // }

  @Delete(':spotId')
  remove(@Param('id') spotId: string, @Param('eventId') eventId: string) {
    return this.spotsService.remove(eventId, spotId);
  }
}
