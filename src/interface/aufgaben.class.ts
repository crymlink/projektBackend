import { Schema } from 'mongoose';

export class Aufgaben {
  fragestellung?: string;
}

export const aufgabenSchema = new Schema({
  fragestellung: String,
});
