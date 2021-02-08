import { Aufgaben } from 'src/interface/aufgaben.class';
import { Ergebnis } from 'src/interface/ergebnis.class';
import { Gruppe } from 'src/interface/gruppe.class';
import { Hinweise } from 'src/interface/hinweis.class';
import { Schueler, SchuelerDocument } from 'src/interface/schueler.class';
import { Teilaufgaben } from 'src/interface/teilaufgaben.class';
import { Themen } from 'src/interface/themen.class';

export class CreateSessionDto {
  readonly session_id: string;
  readonly schuelerList: Schueler[];
  readonly gruppenList: Gruppe[];
  readonly aufgabenList: Aufgaben[];
  readonly teilAufgabenList: Teilaufgaben[];
  readonly hinweisList: Hinweise[];
  readonly themenList: Themen[];
  readonly adminPW: string;
}
