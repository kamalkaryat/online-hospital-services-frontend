import { Hospital } from "./Hospital";

export class DoctorInfo{
	id: string;
	name: string
	qualification: string;
	category: string;
    dob: string;
	hospital: Hospital;
    doctorId: string;

	constructor(){
        this.id= '';
        this.name= '';
        this.qualification= '';
        this.category= '';
		this.dob= '';
		this.hospital= new Hospital();
		this.doctorId= '';
	}
}
