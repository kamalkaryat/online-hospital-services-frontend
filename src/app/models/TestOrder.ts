import { Lab } from "./Lab";
import { Patient } from "./Patient";
import { Product } from "./Product";
import { Status } from "./Status";

export class TestOrder{
	orderId: string;
	patient: Patient;
	product: Product;
	orderDateTime: Date;
	status: Status;
	lab: Lab;

	constructor(){
		this.orderDateTime= new Date();
		this.orderId= '';
		this.patient= new Patient();
		this.product= new Product();
		this.status= Status.REQUEST_SUBMITTED;
		this.lab= new Lab();
	}
}