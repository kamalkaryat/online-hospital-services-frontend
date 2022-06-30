import { Lab } from "./Lab";
import { Product } from "./Product";

export class TestRequest{
    patientId: string;
    product: Product;
    datetime: Date;
    lab: Lab;

    constructor(){
        this.patientId= '';
        this.product= new Product();
        this.datetime= new Date();
        this.lab= new Lab();
    }
}