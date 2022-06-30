import { Hospital } from "./Hospital";
import { Product } from "./Product";

export class ProductStock{
	productId: string;
	productName: string;
	productCategory: string;
	hospital: Hospital;
	cost: number;
	quantity: number;

	constructor(){
		this.productId= '';
		this.productName= '';
		this.productCategory= '';
		this.hospital= new Hospital();
		this.cost= 0;
		this.quantity= 0;
	}
}