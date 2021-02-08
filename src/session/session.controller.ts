import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './schemas/session.schema';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    await this.sessionService.create(createSessionDto);
  }

  @Patch(':id')
  async edit(@Param() params, @Body() createSessionDto: CreateSessionDto) {
    console.log('test');
    await this.sessionService.edit(createSessionDto, params.id);
  }

  @Get()
  async findAll(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Session> {
    return this.sessionService.findOne(params.id);
  }
}
