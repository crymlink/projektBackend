import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { count } from 'console';
import { Model } from 'mongoose';
import { Ergebnis } from 'src/interface/ergebnis.class';
import { Gruppe } from 'src/interface/gruppe.class';
import { Schueler, SchuelerDocument } from 'src/interface/schueler.class';
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

  async login(schueler: Schueler, id: string) {
    console.log(id);
    const session = await this.findOne(id);
    if (session) {
      session.schuelerList.push(schueler);
      const counter: number = session.schuelerList.length;
      session.save();
      console.log(session.schuelerList[counter - 1]);
      return session.schuelerList[counter - 1];
    }
  }

  async setEditErgebnis(
    schuelerId: string,
    ergebnisId: string,
    sessionId: string,
    gruppenId: string,
    teilAufgabeId: string,
  ) {
    // let found = false;
    const session = await this.findOne(sessionId);
    /*
    if (session) {
      session.gruppenList.forEach((gruppe) => {
        if (gruppe._id === gruppenId) {
          if (gruppe.ergebnisse) {
            gruppe.ergebnisse.forEach((ergebnis) => {
              if ((ergebnis.teilAufgabeId = teilAufgabeId)) {
                found = true;
                ergebnis.getEditedFrom = schuelerId;
              }
            });
            if (found === false) {
            }
          }
        }
      });
    }
    */
  }

  async loadErgebnis(
    sessionId: string,
    gruppenId: string,
    teilaufgabenID: string,
  ) {
    const session = await this.findOne(sessionId);
    let ergebnis: Ergebnis;
    if (session) {
      for (const gruppe of session.gruppenList) {
        if (gruppe._id === gruppenId) {
          for (const foundErgebnis of gruppe.ergebnisse) {
            if (foundErgebnis.teilAufgabeId === teilaufgabenID) {
              ergebnis = foundErgebnis;
            }
          }
          if (ergebnis) {
            return ergebnis;
          } else {
            ergebnis = {};
            gruppe.ergebnisse.push(ergebnis);
            const counter: number = gruppe.ergebnisse.length;
            return gruppe.ergebnisse[counter - 1];
          }
        }
      }
      if (ergebnis) {
        return ergebnis;
      }
    }
    return null;
  }

  async edit(createSessionDto: CreateSessionDto, id: string): Promise<Session> {
    if (id) {
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

  async findOne(sessionID: string): Promise<SessionDocument> {
    return await this.sessionModel.findOne({ session_id: sessionID }).exec();
  }

  async findById(id: string) {
    return await this.sessionModel.findById(id);
  }
}
