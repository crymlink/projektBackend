import { Schema } from 'mongoose';
import { Gruppe, gruppeSchema } from './gruppe.class';
import { Teilaufgaben, teilaufgabenSchema } from './teilaufgaben.class';

export class Ergebnis {
  temporalGruppeId?: number;
  text?: string;
}

export const ergebnisSchema = new Schema({
  temporalGruppeId: Number,
  text: String,
});
