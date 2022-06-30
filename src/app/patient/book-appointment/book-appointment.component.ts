import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { error } from 'console';
import { map, Observable, startWith } from 'rxjs';
import { AppointmentRequest } from 'src/app/models/AppointmentRequest';
import { AppointmentResponse } from 'src/app/models/AppointmentResponse';
import { Area } from 'src/app/models/Area';
import { Hospital } from 'src/app/models/Hospital';
import { RescheduleAppointment } from 'src/app/models/RescheduleAppointment';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { PatientService } from 'src/app/services/patient-service/patient.service';
import { DateTimeUtil } from 'src/app/util/dateTimeUtil';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  aptForm !: FormGroup;

   //store filtered options
  filteredOptions: string[]= [];

  dateTimeUtil= new DateTimeUtil();
  today: Date= new Date();

  hospitals: string[]= [];

  aptRes: AppointmentResponse[]= [];

  constructor(
    private hosptService: HospitalService, 
    private patientService: PatientService,
    private fb: FormBuilder, 
    private resMsg: DisplayResponseMessages,
    private title: Title) {   }

  ngOnInit(): void {
    this.title.setTitle('Book Appointment'); 
    this.aptForm=  this.fb.group({
      searchHospitalInfo: this.fb.group({
        hospitalFC: ['', Validators.required],
        areaInfo: this.fb.group({
          stateFC: ['', Validators.required],
          districtFC: ['', Validators.required],
          pincodeFC: ['', Validators.required],
          areaNameFC: ['', Validators.required]
        })
      }),
      dateFC: [new Date(), Validators.required],
      timeFC: [null, Validators.required]
    });
  }
  

  public findAppointments(){
      let h= this.aptForm.get('searchHospitalInfo.hospitalFC')?.value;
      let dt= this.aptForm.controls['dateFC'].value;
      const formatedDate= this.dateTimeUtil.localDateConverter(dt);
      
      if(h === '' || formatedDate == null){
        this.resMsg.displaySnackBar('Date & Hospital are required');
        return;
      }
      this.hosptService.findAppointmentInHospital(h, formatedDate).subscribe({
        next: (res) =>{
            this.aptRes= res;
        },
        error: (err) => {
            console.log("Error while finding appointments");
            this.resMsg.displaySnackBar('Appointments Not Found!');
        }
      })
  }

  onSubmit(){
    this.patientService.bookAppointment(this.toBookAptRequest()).subscribe({
      next: (res)=>{
        this.resMsg.displaySnackBar('Appointment Booked');
      },
      error: (err)=>{
          console.log('Error while booking appointment');
          this.resMsg.displayErrorCategoryAndMessage('Booking Failed', err.error);          
      }
    })  
  }

  private toBookAptRequest(): AppointmentRequest{
    let request= new AppointmentRequest();
    
    request.date=this.aptForm.controls['dateFC'].value;
    request.time= this.aptForm.controls['timeFC'].value;
    
    let area= new Area();
    area.state= this.aptForm.get('searchHospitalInfo.areaInfo.stateFC')?.value;
    area.district= this.aptForm.get('searchHospitalInfo.areaInfo.districtFC')?.value;
    area.pincode= this.aptForm.get('searchHospitalInfo.areaInfo.pincodeFC')?.value;
    area.areaName= this.aptForm.get('searchHospitalInfo.areaInfo.areaNameFC')?.value;

    let hospital= new Hospital();
    hospital.area= area;
    hospital.hospitalName= this.aptForm.get('searchHospitalInfo.hospitalFC')?.value;
              
    request.hospital= hospital;
    console.log(request);
    
    return request;
  }
}
