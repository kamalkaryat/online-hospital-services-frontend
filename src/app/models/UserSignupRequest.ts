import { Gender } from "./Gender";

export class UserSignupRequest{
    name : string;
    dob : Date;
    gender : Gender;
    phoneNo : number;
    email : string;
    password : string;
    confirmPassword : string;
    status : boolean;

    constructor(name: string, dob: Date, gender: Gender, phoneNo: number, email: string, password: string,
        confirmPassword: string, status: boolean){ 
        this.name= name;
        this.dob= dob;
        this.gender= gender;
        this.phoneNo= phoneNo;
        this.email= email;
        this.password= password;
        this.confirmPassword= confirmPassword;
        this.status= status;
    }
}