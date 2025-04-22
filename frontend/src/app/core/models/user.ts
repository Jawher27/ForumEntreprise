export class User {
    id: number;
    firstName: string;
    email: string;
    password: string;
    cin: number;
    cv: string;
    phoneNumber: number;
    lastName: string;
    picture: ArrayBuffer; // Use Buffer as a type
    role: string;
    banned :Boolean;


    constructor() {
        this.id = 0;
        this.firstName = "";
        this.email = "";
        this.password = "";
        this.cin = 0;
        this.cv = "";
        this.phoneNumber = 0;
        this.lastName = "";
        this.picture = new ArrayBuffer(0)// Initialize picture as an empty Buffer
        this.role = "";
        this.banned=false;
    }

    OnSubmitForm() {
        console.log("Form submitted!");
        console.log("First Name: ", this.firstName);
        console.log("Last Name: ", this.lastName);
        console.log("CIN: ", this.cin);
        console.log("Picture: ", this.picture);
        console.log("Phone Number: ", this.phoneNumber);
        console.log("CV: ", this.cv);
        console.log("Email: ", this.email);
        console.log("Password: ", this.password);

    }
}