import { ProductStock } from "../models/ProductStock";
import { ProductStockResponse } from "../models/ProductStockResponse";

export class ProductStockConverter{
    private ps: ProductStock[]= [];

    convert(productStockRes: ProductStockResponse[]): ProductStock[]{
        for (let i = 0; i < productStockRes.length; i++) {
            const psr = productStockRes[i];
            if(psr.quantity<1)
                continue;
        
            let prodInfo= new ProductStock();
            prodInfo.hospital= psr.hospital;
            prodInfo.cost= psr.cost;
            prodInfo.quantity= psr.quantity;
            prodInfo.productId= psr.product.productId;
            prodInfo.productName= psr.product.productName;
            prodInfo.productCategory= psr.product.productCategory;
            this.ps[i]= prodInfo;
        }
        return this.ps;
    }
}