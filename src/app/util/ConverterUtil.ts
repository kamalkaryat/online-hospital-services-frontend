import { Injectable } from "@angular/core";
import { Hospital } from "../models/Hospital";
import { Lab } from "../models/Lab";

@Injectable()
export class ConverterUtil{
    
    public getHospitalNames(hospitals: Hospital[], state: string): string[]{
        var filteredHospitals= hospitals.filter(hospital=> hospital.area.state === state);
        return filteredHospitals.map(hospital=> hospital.hospitalName);
    }

    public getLablNames(labs: Lab[], hospitalName: string): string[]{
        var filteredLabs= labs.filter(lab=> lab.hospital.hospitalName === hospitalName);
        return filteredLabs.map(lab=> lab.labName);
    }

    
}