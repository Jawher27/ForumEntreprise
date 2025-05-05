import { User } from "./user";


export enum TypeOffre {
    STAGE_PFE_INGENIEUR = 'STAGE_PFE_INGENIEUR',
    STAGE_PFE_LICENCE = 'STAGE_PFE_LICENCE',
    OFFRE_ETE = 'OFFRE_ETE'
}

export class Offre {
    idOffre: number;
    titre: string;
    description: string;
    typeOffre: TypeOffre;
    periode: string;
    dateDebut: Date;
    dateFin: Date;
    dateCreation: Date;
    lieu: string;
    user: User;

    // constructor() {
    //     this.idOffre = 0;
    //     this.titre = '';
    //     this.description = '';
    //     this.typeOffre = null;
    //     this.periode = '';
    //     this.dateDebut = null;
    //     this.dateFin = null;
    //     this.dateCreation = null;
    //     this.lieu = '';
    //     this.user = null;
    // }
}
