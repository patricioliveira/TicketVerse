import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SpotStatus } from '@prisma/client';

@Injectable()
export class SpotsService {
  constructor(private _prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    const event = await this._prismaService.event.findFirst({
      where: {
        id: createSpotDto.eventId,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return this._prismaService.spot.create({
      data: {
        ...createSpotDto,
        status: SpotStatus.available,
      },
    });
  }

  findAll(eventId: string) {
    return this._prismaService.spot.findMany({
      where: {
        eventId,
      },
    });
  }

  findOne(eventId: string, spotId: string) {
    return this._prismaService.spot.findFirst({
      where: {
        id: spotId,
        eventId,
      },
    });
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this._prismaService.spot.update({
      where: {
        id: spotId,
        eventId,
      },
      data: updateSpotDto,
    });
  }

  remove(eventId: string, spotId: string) {
    return this._prismaService.spot.delete({
      where: {
        id: spotId,
        eventId,
      },
    });
  }
}
