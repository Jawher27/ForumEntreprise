import { User } from "./user";

export class Offre {
    idOffre: number;
    description: string;
    typeOffre: string; // Assuming EnumType.STRING is a string in the frontend
    experience: string;
    dateCreation: Date;
    lieu: string;
    validite: boolean;
    user: User; // Assuming you have a User model
  }