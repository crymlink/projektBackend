import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './schemas/session.schema';
import { Schueler } from 'src/interface/schueler.class';
import { get } from 'http';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    console.log(createSessionDto);
    return await this.sessionService.create(createSessionDto);
  }

  @Patch('edit/:id')
  async edit(@Param() params, @Body() createSessionDto: CreateSessionDto) {
    console.log('?');
    return await this.sessionService.edit(createSessionDto, params.id);
  }

  @Post('login/:id')
  async login(@Param() params, @Body() schueler: Schueler) {
    console.log('hallo');
    return await this.sessionService.login(schueler, params.id);
  }

  @Post('loadErgebnis')
  async loadErgebnis(
    @Body()
    data: {
      teilAufgabeId: string;
      gruppenId: string;
      sessionId: string;
      schuelerId: string;
    },
  ) {
    return await this.sessionService.loadOrCreateErgebnis(
      data.schuelerId,
      data.sessionId,
      data.gruppenId,
      data.teilAufgabeId,
    );
  }

  @Post('saveErgebnis')
  async saveErgebnis(
    @Body()
    data: {
      teilAufgabeId: string;
      gruppenId: string;
      sessionId: string;
      schuelerId: string;
      text: string;
    },
  ) {
    return await this.sessionService.saveErgebnis(
      data.schuelerId,
      data.sessionId,
      data.gruppenId,
      data.teilAufgabeId,
      data.text,
    );
  }

  @Get()
  async findAll(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Post('setEdit')
  async setEditId(
    @Body()
    data: {
      teilAufgabeId: string;
      gruppenId: string;
      sessionId: string;
      schuelerId: string;
    },
  ) {
    console.log('seteditLog im Post');
    return await this.sessionService.setEditErgebnis(
      data.schuelerId,
      data.sessionId,
      data.gruppenId,
      data.teilAufgabeId,
    );
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Session> {
    return this.sessionService.findOne(params.id);
  }
}
