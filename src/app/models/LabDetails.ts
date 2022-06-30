import { Area } from "./Area";
import { Hospital } from "./Hospital";
import { Lab } from "./Lab";
import { BusinessType } from "./Type";

export class LabDetails{
    labId ?: string;
    labName ?: string;
    labType ?: BusinessType;
    hospital ?: Hospital;
    area ?: Area;
    status ?: boolean;

    public convertToLabDetail(labs: Lab[]): LabDetails[]{
        return labs.map(lab=>{
            let ld= new LabDetails();
            ld.labId= lab.labId;
            ld.labName= lab.labName;
            ld.labType= lab.hospital.hospitalType;
            ld.area= lab.hospital.area;
            ld.hospital= lab.hospital;
            ld.status= lab.labStatus;
            return ld;
        })
    }
}