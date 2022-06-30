import { Gender } from "./Gender";
import { Hospital } from "./Hospital";
import { UserSignupRequest } from "./UserSignupRequest";

export class DoctorSignupRequest extends UserSignupRequest{
    hospital : Hospital;
    department : string
    qualification : string;
    
    constructor(name: string, dob: Date, gender: Gender, phoneNo: number, email: string, password: string,
        confirmPassword: string, status: boolean, hospital: Hospital, department: string, qualification: string){
        super(name, dob, gender,phoneNo, email, password, confirmPassword,status);
        this.hospital= hospital;
        this.department= department;
        this.qualification= qualification;
    }
}