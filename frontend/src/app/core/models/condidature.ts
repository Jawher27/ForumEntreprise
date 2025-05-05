import { Entretien } from './Entretien';
import { Offre } from './Offre';
import { User } from './user';

export enum EtatCondidature {
    Submitted= 'Submitted',
    Pending= 'Pending',
    AcceptedForFirstInterview= 'AcceptedForFirstInterview',
    AcceptedForSecondInterview= 'AcceptedForSecondInterview',
    WelcomeToTheTeam= 'WelcomeToTheTeam',
    NotAccepted= 'NotAccepted',
}


export class Condidature {
    idCondidature: number;
    refCondidature: string;
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
  

