import { Host } from "@angular/core";
import { Area } from "./Area";
import { Hospital } from "./Hospital";

export class User{
    username: string;
    id: string;
    area: Area;
    enabled: boolean;
    hospital: Hospital;
    roles: string[];

    public constructor(){
        this.username= '';
        this.id= '';
        this.enabled= false;
        this.hospital= new Hospital();
        this.area= new Area();
        this.roles= [];
    }
}