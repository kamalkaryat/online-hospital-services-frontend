import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { FilterOptions } from 'src/app/common/FilterOptions';
import { AppointmentRequest } from 'src/app/models/AppointmentRequest';
import { AppointmentRescheduleRequest } from 'src/app/models/AppointmentRescheduleRequest';
import { AppointmentResponse } from 'src/app/models/AppointmentResponse';
import { Area } from 'src/app/models/Area';
import { Hospital } from 'src/app/models/Hospital';
import { RescheduleAppointment } from 'src/app/models/RescheduleAppointment';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { PatientService } from 'src/app/services/patient-service/patient.service';
import { DateTimeUtil } from 'src/app/util/dateTimeUtil';

@Component({
  selector: 'app-apt-reschedule-dialog',
  templateUrl: './apt-reschedule-dialog.component.html',
  styleUrls: ['./apt-reschedule-dialog.component.css']
})
export class AptRescheduleDialogComponent implements OnInit {

  aptForm: FormGroup;
  btnName= 'Reschedule';
  dateTimeUtil= new DateTimeUtil();

  today= new Date();
  aptRes: AppointmentResponse[]= [];

  constructor(
      private fb: FormBuilder, 
      private patientService: PatientService,
      @Inject(MAT_DIALOG_DATA) public aptData: any,  
      public dialogRef: MatDialogRef<AptRescheduleDialogComponent>, 
      private resMsg: DisplayResponseMessages,
      private filterOptions: FilterOptions,
      private hospitalService: HospitalService) {
    
      this.aptForm= this.fb.group({
          hospitalFC: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(20)]],
          dateFC: [new Date(), [Validators.required]],
          timeFC: [null, [Validators.required]],
          bookingIdFC: [{value: '', disabled: true}, [Validators.required]]
      })
  }

  ngOnInit(): void {
      if(this.aptData){
        this.aptForm.controls['hospitalFC'].setValue(this.aptData.hospitalName);
        this.aptForm.controls['dateFC'].setValue(this.aptData.aptDate);
        this.aptForm.controls['timeFC'].setValue(this.aptData.aptTime);
        this.aptForm.controls['bookingIdFC'].setValue(this.aptData.bookingId);
      }
  }  

    onBtnClick(){
      if(!this.aptForm.valid){
          this.resMsg.displaySnackBar('Some errror exists in from!');
          return;
      }
      this.patientService.rescheduleAppointment(this.toAptRequest()).subscribe({
        next: (res)=>{
            this.dialogRef.close('appointmentRescheduled');
            this.resMsg.displaySnackBar('Appointment Rescheduled Successfully'); 
        },
        error: (err)=>{
          console.log('');
          
            this.resMsg.displayErrorCategoryAndMessage('Failed: ', err.error);
            this.dialogRef.close('appointmentNotRescheduled');
        }
      });
    }

    public findAppointments(){
      let h= this.aptForm.get('searchHospitalInfo.hospitalFC')?.value;
      let dt= this.aptForm.controls['dateFC'].value;
      if(h === '' || dt == null){
        this.resMsg.displaySnackBar('Date & Hospital are required');
        return;
      }
      const formatedDate= this.dateTimeUtil.localDateConverter(new Date(dt));
      console.log('formated date: '+formatedDate);
      
      
      this.hospitalService.findAppointmentInHospital(h, formatedDate).subscribe({
        next: (res) =>{
            this.aptRes= res;
        },
        error: (err) => {
            console.log("Error while finding appointments");
            this.resMsg.displaySnackBar('Appointments Not Found!');
        }
      })
  }

  private toAptRequest(): AppointmentRequest{
    let request= new AppointmentRequest();
    
    request.date=this.aptForm.controls['dateFC'].value;
    request.time= this.aptForm.controls['timeFC'].value;
    request.bookingId= this.aptForm.controls['bookingIdFC'].value;

    let hospital= new Hospital();
    hospital.hospitalName= this.aptForm.controls['hospitalFC'].value;
              
    request.hospital= hospital;
    
    return request;
  }
}
