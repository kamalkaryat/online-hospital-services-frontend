import { Area } from "./Area";
import { Login } from "./Login";

export class Patient{
    patientId: string;
    patientName: string;
    patientDob: string;
    patientGender: string;
    patientPhoneNo: number;
    area: Area;
    password: string;
    confirmPassword: string;
    login: Login;
    
    constructor(){
        this.patientName= '';
        this.patientDob= '';
        this.patientGender= '';
        this.patientPhoneNo=0;
        this.area= new Area();
        this.password= '';
        this.confirmPassword= '';
        this.patientId= '';
        this.login= new Login();
    }
}