import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session, SessionDocument } from './schemas/session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const createdSession = new this.sessionModel(createSessionDto);
    createdSession.session_id = 'somethingUnique';
    return createdSession.save();
  }

  async edit(createSessionDto: CreateSessionDto, id: string): Promise<Session> {
    console.log(id);
    if (id) {
      console.log(createSessionDto.schuelerList);
      const foundSession = await this.findById(id);
      if (createSessionDto.aufgabenList) {
        foundSession.aufgabenList = createSessionDto.aufgabenList;
      }
      if (createSessionDto.gruppenList) {
        foundSession.gruppenList = createSessionDto.gruppenList;
      }
      if (createSessionDto.hinweisList) {
        foundSession.hinweisList = createSessionDto.hinweisList;
      }
      if (createSessionDto.schuelerList) {
        console.log(createSessionDto);
        foundSession.schuelerList = createSessionDto.schuelerList;
      }
      if (createSessionDto.teilAufgabenList) {
        foundSession.teilAufgabenList = createSessionDto.teilAufgabenList;
      }
      if (createSessionDto.themenList) {
        foundSession.themenList = createSessionDto.themenList;
      }
      return foundSession.save();
    }
  }

  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }

  async findOne(sessionID: string): Promise<Session> {
    return await this.sessionModel.findOne({ session_id: sessionID }).exec();
  }

  async findById(id: string) {
    return await this.sessionModel.findById(id);
  }
}
