import { Gender } from "./Gender";
import { Hospital } from "./Hospital";

export class Doctor{
	doctorId: string;
	doctorName: string
	doctorPhoneNo: number;
	doctorGender: Gender;
	doctorDob: string;
	doctorQualification: string;
	doctorStatus: boolean;
	doctorDept: string;
	hospital: Hospital;

	constructor(){
		this.doctorId= '';
		this.doctorName= '';
		this.doctorDob= '';
		this.doctorPhoneNo= 0;
		this.doctorGender= Gender.Male;
		this.doctorQualification= '';
		this.doctorStatus= false;
		this.hospital= new Hospital();
		this.doctorDept= '';
	}
}