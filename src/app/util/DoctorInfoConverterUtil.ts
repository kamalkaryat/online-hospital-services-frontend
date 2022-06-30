import { Doctor } from "../models/Doctor";
import { DoctorInfo } from "../models/DoctorInfo";

export class DoctorsInfoConverter{
    
    private doctorList: DoctorInfo[]= [];

    public toDoctorInfo(doctors: Doctor[]): DoctorInfo[]{
        for (let index = 0; index < doctors.length; index++) {
            let di= new DoctorInfo();
            
            di.doctorId= doctors[index].doctorId;
            di.name= doctors[index].doctorName;
            di.qualification= doctors[index].doctorQualification;
            di.category= doctors[index].doctorCategory;
            di.dob= doctors[index].doctorDob;
            di.hospital= doctors[index].hospital;
            this.doctorList[index]= di;
          }
          return this.doctorList;
    }
}