import { Entretien } from './Entretien';
import { Offre } from './Offre';
import { User } from './user';

export enum EtatCondidature {
  Waitlisted= 'Waitlisted',
  Accepted= 'Accepted',
  Rejected= 'Rejected',
}


export class Condidature {
    idCondidature: number;
    etatCondidature: EtatCondidature;
    coverLetter: string;
    cv: string;
    entretien: Entretien;
    offre: Offre;
    user: User;
  }
  
  // export interface Entretien {
  //   // Définissez les propriétés de l'entité Entretien si nécessaire
  // }
  
  // export interface Offre {
  //   // Définissez les propriétés de l'entité Offre si nécessaire
  // }
  

