import { Area } from "./Area";
import { Gender } from "./Gender";
import { UserSignupRequest } from "./UserSignupRequest";

export class PatientSignupRequest extends UserSignupRequest{
    area : Area;

    constructor(name: string, dob: Date, gender: Gender, phoneNo: number, email: string, password: string,
        confirmPassword: string, status: boolean, area: Area){
        super(name, dob, gender,phoneNo, email, password, confirmPassword,status);
        this.area= area;
    }
}