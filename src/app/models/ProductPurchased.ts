import { Patient } from "./Patient";
import { Product } from "./Product";

export class ProductPurchased{
	txnId: string;
	product: Product;
	patient: Patient;
	quantity: number;
	totalCost: number;
	purchaseDateTime: string;

	constructor(){
		this.txnId= '';
		this.product= new Product();
		this.patient= new Patient();
		this.quantity= 0;
		this.totalCost= 0;
		this.purchaseDateTime= '';
	}
}
