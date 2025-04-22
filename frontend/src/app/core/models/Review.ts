import { Offre } from "./Offre";
import { User } from "./user";

export class Review {
    idReview: number;
    rating: number = 0;   
    comment: string;
    user: User; // Assuming you have a User class in your Angular application
    offre: Offre;
  
  }
  
 
  