import { Hospital } from "./Hospital";
import { Product } from "./Product";

export interface ProductStockResponse{
    product: Product;
    hospital: Hospital;
    cost: number;
    quantity: number;
}