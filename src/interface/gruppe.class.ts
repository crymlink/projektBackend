import { Schema } from 'mongoose';
import { Aufgaben, aufgabenSchema } from './aufgaben.class';
import { Ergebnis, ergebnisSchema } from './ergebnis.class';
import { Schueler, schuelerSchema } from './schueler.class';
import { Themen, themenSchema } from './themen.class';

export class Gruppe {
  _id?: string;
  temporalCreateId?: number;
  schuelerList?: Schueler[];
  name?: Themen; //name of thema
  groeße?: number;
  ergebnisse?: Ergebnis[];
}
export const gruppeSchema = new Schema({
  temporalCreateId: Number,
  schuelerList: [schuelerSchema],
  name: themenSchema,
  groeße: Number,
  ergebnisse: [ergebnisSchema],
});
