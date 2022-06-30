import { Gender } from "./Gender";
import { Hospital } from "./Hospital";
import { Login } from "./Login";

export class HospitalAdmin{
    hospitalAdminId: string;
    hospitalAdminName: string;
    hospitalAdminDob: Date;
    hospitalAdminGender: Gender;
    hospitalAdminPhoneNo: number;
    hospital: Hospital;
    login: Login;

    constructor(){
        this.hospitalAdminId= '';
        this.hospitalAdminName= '';
        this.hospitalAdminDob= new Date();
        this.hospitalAdminPhoneNo= 0;
        this.login= new Login();
        this.hospitalAdminGender= Gender.Male;
        this.hospital= new Hospital();
    }
}