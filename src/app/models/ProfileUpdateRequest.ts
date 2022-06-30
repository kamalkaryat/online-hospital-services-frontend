import { Area } from "./Area";
import { Gender } from "./Gender";
import { Hospital } from "./Hospital";
import { BusinessType } from "./Type";

export class ProfileUpdateRequest{
    id: string;
    username: string;
    dob: Date;
    name: string;
    gender: Gender
    phoneNo: number;
    type: BusinessType;
    area: Area;
    docCategory: string;
    docStatus: boolean;
    docQualification: string;
    hospital: Hospital;

    constructor(){
        this.id= '';
        this.username=  '';
        this.dob= new Date();
        this.name= '';
        this.phoneNo= 0;
        this.docCategory ='';
        this.docStatus= false;
        this.docQualification= '';
        this.area= new Area();
        this.hospital= new Hospital();
        this.type= BusinessType.PRIVATE;
        this.gender= Gender.Male;
    }
}