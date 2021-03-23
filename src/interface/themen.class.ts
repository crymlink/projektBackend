import { Schema } from 'mongoose';

export class Themen {
  name: string;
  text?: string;
  typ?: string;
}
export const themenSchema = new Schema({
  name: String,
  text: String,
  typ: String,
});
