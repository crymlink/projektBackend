import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Aufgaben, aufgabenSchema } from 'src/interface/aufgaben.class';
import { Ergebnis, ergebnisSchema } from 'src/interface/ergebnis.class';
import { Gruppe, gruppeSchema } from 'src/interface/gruppe.class';
import { Hinweise, hinweisSchema } from 'src/interface/hinweis.class';
import { Schueler, schuelerSchema } from 'src/interface/schueler.class';
import {
  Teilaufgaben,
  teilaufgabenSchema,
} from 'src/interface/teilaufgaben.class';
import { Themen, themenSchema } from 'src/interface/themen.class';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ unique: true })
  session_id: string;
  @Prop([schuelerSchema])
  schuelerList: Schueler[];
  @Prop([gruppeSchema])
  gruppenList: Gruppe[];
  @Prop([aufgabenSchema])
  aufgabenList: Aufgaben[];
  @Prop([teilaufgabenSchema])
  teilAufgabenList: Teilaufgaben[];
  @Prop([hinweisSchema])
  hinweisList: Hinweise[];
  @Prop([ergebnisSchema])
  ergebnisList: Ergebnis[];
  @Prop([themenSchema])
  themenList: Themen[];
  @Prop()
  adminPW: string;
  @Prop()
  phase: string;
  @Prop()
  banNames: string[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
