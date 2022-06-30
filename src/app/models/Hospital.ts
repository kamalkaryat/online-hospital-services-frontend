import { Area } from "./Area";
import { BusinessType } from "./Type";

export class Hospital{
    hospitalId: string;
    hospitalName: string;
    hospitalType: BusinessType;
    hospitalPhoneNo: number;
    hospitalEmail: string;
    area: Area;
    hospitalStatus: boolean;

    constructor(){
        this.hospitalEmail= '';
        this.hospitalName= '';
        this.hospitalId= '';
        this.hospitalType= BusinessType.GOVERNMENT;
        this.hospitalPhoneNo= 0;
        this.area= new Area();
        this.hospitalStatus= true;
    }
}