import { Schema } from 'mongoose';
import { Ergebnis, ergebnisSchema } from './ergebnis.class';

export class Teilaufgaben {
  name: string;
  text: string;
  typ: string;
  ergebnisse: Ergebnis[];
}
export const teilaufgabenSchema = new Schema({
  name: String,
  text: String,
  typ: String,
  ergebnisList: [ergebnisSchema],
});
