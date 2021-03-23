import { Schema } from 'mongoose';
import { Ergebnis, ergebnisSchema } from './ergebnis.class';

export class Teilaufgaben {
  name: string;
  text?: string;
  typ?: string;
}
export const teilaufgabenSchema = new Schema({
  name: String,
  text: String,
  typ: String,
});
