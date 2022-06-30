import { Gender } from "./Gender";
import { Hospital } from "./Hospital";
import { UserSignupRequest } from "./UserSignupRequest";

export class HospitalAdminSignupRequest extends UserSignupRequest{
    hospital: Hospital;

    constructor(name: string, dob: Date, gender: Gender, phoneNo: number, email: string, password: string,
        confirmPassword: string, status: boolean, hospital: Hospital){
        super(name, dob, gender,phoneNo, email, password, confirmPassword,status);
        this.hospital= hospital
    }
}