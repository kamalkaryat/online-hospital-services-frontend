import { Area } from "./Area";
import { Hospital } from "./Hospital";
import { BusinessType } from "./Type";

export class Lab{
	labId: string;
	labName: string;
	hospital: Hospital;
	labStatus : boolean;

	constructor(){
		this.labId= '';
		this.labName= '';
		this.hospital= new Hospital();
		this.labStatus= false;
	}
}
