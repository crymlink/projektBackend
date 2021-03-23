import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    console.log(createSessionDto);
    const createdSession = new this.sessionModel(createSessionDto);
    return await createdSession.save();
  }

  async login(schueler: Schueler, id: string) {
    const session = await this.findOne(id);
    if (session) {
      session.schuelerList.push(schueler);
      const counter: number = session.schuelerList.length;
      session.save();
      return session.schuelerList[counter - 1];
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async setEditErgebnis(
    schuelerId: string,
    sessionId: string,
    gruppenId: string,
    teilAufgabeId: string,
  ) {
    const session = await this.findOne(sessionId);

    if (session) {
      session.gruppenList = session.gruppenList.map((gruppe) => {
        if (gruppe._id.toString() === gruppenId) {
          if (gruppe.ergebnisse) {
            gruppe.ergebnisse = gruppe.ergebnisse.map((ergebnis) => {
              if (ergebnis.teilAufgabeId.toString() === teilAufgabeId) {
                if (!ergebnis.getEditedFrom) {
                  ergebnis.getEditedFrom = schuelerId;
                }
              }
              return ergebnis;
            });
          }
        }
        return gruppe;
      });
    }
    return await session.save();
  }

  async loadOrCreateErgebnis(
    schuelerId: string,
    sessionId: string,
    gruppenId: string,
    teilAufgabeId: string,
  ) {
    const session = await this.findOne(sessionId);
    let foundErgebnis: Ergebnis;
    let createdErgebnis: Ergebnis;

    if (session) {
      session.gruppenList = session.gruppenList.map((gruppe) => {
        if (gruppe._id.toString() === gruppenId) {
          console.log(gruppenId);
          if (gruppe.ergebnisse) {
            gruppe.ergebnisse.map((ergebnis) => {
              if (ergebnis.teilAufgabeId.toString() === teilAufgabeId) {
                foundErgebnis = ergebnis;
              }
            });
          }
          if (!foundErgebnis) {
            createdErgebnis = {
              teilAufgabeId: teilAufgabeId,
              getEditedFrom: '',
              text: '',
            };
            gruppe.ergebnisse.push(createdErgebnis);
            createdErgebnis = gruppe.ergebnisse[gruppe.ergebnisse.length - 1];
          }
        }
        return gruppe;
      });
      if (!foundErgebnis) {
        console.log('created');
        await session.save();
        return createdErgebnis;
      } else {
        console.log('found');
        return foundErgebnis;
      }
    }
  }

  async saveErgebnis(
    schuelerId: string,
    sessionId: string,
    gruppenId: string,
    teilAufgabeId: string,
    text: string,
  ) {
    const session = await this.findOne(sessionId);

    if (session) {
      session.gruppenList = session.gruppenList.map((gruppe) => {
        if (gruppe._id.toString() === gruppenId) {
          if (gruppe.ergebnisse) {
            gruppe.ergebnisse = gruppe.ergebnisse.map((ergebnis) => {
              if (ergebnis.teilAufgabeId.toString() === teilAufgabeId) {
                if (ergebnis.getEditedFrom?.toString() === schuelerId) {
                  console.log(text);
                  console.log('hallo');
                  ergebnis.text = text;
                  ergebnis.getEditedFrom = null;
                }
              }
              return ergebnis;
            });
          }
        }
        return gruppe;
      });
    }
    return await session.save();
  }

  /*
  async findErgebnisToTeilaufgabe(
    sessionId: string,
    teilAufgabeId: string,
    gruppenId: string,
    something: ,
  ) {
    const session = await this.findOne(sessionId);

    if (session) {
      session.gruppenList.forEach((gruppe) => {
        if (gruppe._id === gruppenId) {
          if (gruppe.ergebnisse) {
            gruppe.ergebnisse.forEach((ergebnis) => {});
          }
        }
      });
    }
  }
  */

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
      if (createSessionDto.phase) {
        foundSession.phase = createSessionDto.phase;
      }
      if (createSessionDto.banNames) {
        foundSession.banNames = createSessionDto.banNames;
      }
      const something = await foundSession.save();
      console.log(something.gruppenList);
      return await foundSession.save();
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
