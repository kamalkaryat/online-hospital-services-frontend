import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { Hospital } from 'src/app/models/Hospital';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.css']
})
export class AddAppointmentDialogComponent implements OnInit {

  form !: FormGroup;
  today= new Date();
  
  constructor(private fb: FormBuilder, private resMsg: DisplayResponseMessages,
    private haService: HospitalAdminService) { }

  ngOnInit(): void {
      let hospitalId= this.haService.getHospital().hospitalId;      
      this.form= this.fb.group({
          hospitalIdFC: [{value: hospitalId, disabled: true}],
          aptDateFC: [new Date(), Validators.required],
          aptTimeFC: [null, Validators.required],
          totalAptFC: [null, [Validators.required, Validators.min(10), Validators.max(100)]]
      })
  }

  addAppointment(){
    this.haService.addAppointment(this.createAppointment()).subscribe({
      next: (res)=>{
          this.resMsg.displaySnackBar('Appointment Added');
      },
      error: (err)=>{
        console.log(err);
        this.resMsg.displayErrorCategoryAndMessage('Appointment Not Added', err.error);
      }
    })
  }

  private createAppointment(): Appointment{
    let appointment= new Appointment();
    appointment.appointmentDate= this.form.controls['aptDateFC'].value;
    appointment.appointmentTime= this.form.controls['aptTimeFC'].value;
    appointment.totalAppointments= this.form.controls['totalAptFC'].value;

    let hospital= new Hospital();
    hospital.hospitalId= this.form.controls['hospitalIdFC'].value;
    appointment.hospital= hospital;
    
    return appointment
  }
}
