import { Schema } from 'mongoose';

export class Hinweise {
  name: string;
  text: string;
  typ: string;
}
export const hinweisSchema = new Schema({
  name: String,
  text: String,
  typ: String,
});
