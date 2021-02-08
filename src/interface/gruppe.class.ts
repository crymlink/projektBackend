import { Schema } from 'mongoose';
import { Aufgaben, aufgabenSchema } from './aufgaben.class';
import { Schueler, schuelerSchema } from './schueler.class';
import { Themen, themenSchema } from './themen.class';

export class Gruppe {
  temporalCreateId?: number;
  schuelerList?: Schueler[];
  name?: Themen; //name of thema
  aufgabenList?: Aufgaben[];
  groeße?: number;
}
export const gruppeSchema = new Schema({
  temporalCreateId: Number,
  schuelerList: [schuelerSchema],
  name: themenSchema,
  aufgabenList: [aufgabenSchema],
  groeße: Number,
});
