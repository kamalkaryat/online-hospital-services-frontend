export class PurchaseProductRequest{
    productId: string;
	patientId: string;
	cost: number;
	quantity: number;
  	hospitalName: string;

	constructor(){
		this.productId= '';
		this.patientId= '';
		this.cost= 0;
		this.quantity= 0;
		this.hospitalName= '';
	}
}