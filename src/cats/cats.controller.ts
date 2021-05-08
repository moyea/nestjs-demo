import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cat } from './cat.schema';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createdCatDto: CreateCatDto) {
    await this.catsService.create(createdCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
