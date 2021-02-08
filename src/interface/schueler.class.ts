import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Mongoose, Schema } from 'mongoose';

export type SchuelerDocument = Schueler & Document;

export class Schueler {
  name: string;
  gruppenId?: string;
}

export const schuelerSchema = new Schema({
  name: String,
  gruppenId: String,
});
