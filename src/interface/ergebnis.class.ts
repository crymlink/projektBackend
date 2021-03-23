import { Schema } from 'mongoose';
import { Gruppe, gruppeSchema } from './gruppe.class';
import { Teilaufgaben, teilaufgabenSchema } from './teilaufgaben.class';

export class Ergebnis {
  teilAufgabeId?: string;
  text?: string;
  getEditedFrom?: string;
}

export const ergebnisSchema = new Schema({
  teilAufgabeId: String,
  text: String,
  getEditedFrom: String,
});
