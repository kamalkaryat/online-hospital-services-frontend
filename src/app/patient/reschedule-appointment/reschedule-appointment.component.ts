import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { RescheduleAppointment } from 'src/app/models/RescheduleAppointment';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { DateTimeUtil } from 'src/app/util/dateTimeUtil';

@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css']
})
export class RescheduleAppointmentComponent implements OnInit {
   
  aptForm=  new FormGroup({
    hospitalFC: new FormControl(''),
    dateFC: new FormControl(new Date(), Validators.required),
    timeFC: new FormControl('', Validators.required)
  });

  filteredOptions!: Observable<string[]>;
  dateTimeUtil= new DateTimeUtil();

  //TODO-1: fetch from db
  hospital= 'aiims delhi';

  //TODO-2: fetch from DB
  timings: string[]= ['9:00', '10:00', '11:00','12:00', '2:00','3:00','4:00'];

  selectedTime= this.aptForm.get('timeFC');

  constructor(private hosptService: HospitalService) {   }


  ngOnInit(): void {
      this.aptForm.controls['hospitalFC'].disable();

      //TODO-1: fetch from db
      this.aptForm.controls['hospitalFC'].setValue(this.hospital);
  }
  
  populateHospitals(){
    // this.findAppointment();
  }

  //TODO-3: CALL API
  findAppointment(){
      
  }

  onSubmit(){
    let resApt= new RescheduleAppointment();

    resApt.hospitalName= this.aptForm.controls['hospitalFC'].value;
    resApt.date= this.dateTimeUtil.localDateConverter(this.aptForm.controls['dateFC'].value);
    resApt.time= this.aptForm.controls['timeFC'].value;

    alert('rescheduling appointment');
    console.log(resApt);
    
    //TODO-4 RESCHEDULE APPOINTMENT
  }
}
