import { Hospital } from "./Hospital";
import { Product } from "./Product";

export class ProductQuantity{
	product: Product;
	hospital: Hospital;
	quantity: number;
	cost: number;
	constructor(){
		this.product= new Product();
		this.hospital= new Hospital();
		this.quantity= 0;
		this.cost= 0;
	}
}