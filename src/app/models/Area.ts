export class Area{
    areaName: string;
    pincode: number;
    district: string;
    state: string;
    areaId: number;

    constructor(){
        this.areaId= 0;
        this.state= '';
        this.district= '';
        this.areaName= '';
        this.pincode= 0;
    }
}