import { TypeAnnonce } from "./typeAnnonce";

export class Announcement {
  id: number;
  announcementName: string;
  articlePrice: number;
  articlePicture: string;
  valid: boolean;
  quantity: number;
  // score?: number; // Depending on whether you receive this property
  user?: any;
  typeAnnonce: TypeAnnonce;
  // Add other properties if needed

  // constructor() {
  //   this.type = new TypeAnnonce(); // Initialize the type to avoid null reference errors
  // }
}