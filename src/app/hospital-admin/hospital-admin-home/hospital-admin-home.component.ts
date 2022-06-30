import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AddAppointmentDialogComponent } from 'src/app/dialogs/add-appointment-dialog/add-appointment-dialog.component';
import { AddDoctorDialogComponent } from 'src/app/dialogs/add-doctor-dialog/add-doctor-dialog.component';
import { LinkProductDialogComponent } from 'src/app/dialogs/link-product-dialog/link-product-dialog.component';

@Component({
  selector: 'app-hospital-admin-home',
  templateUrl: './hospital-admin-home.component.html',
  styleUrls: ['./hospital-admin-home.component.css']
})
export class HospitalAdminHomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Home');
  }

  //add a new appointment in hospital
  addAppointment(){
    this.dialog.open(AddAppointmentDialogComponent, {
      width: '30%'
    })
  }

  //register doctors of his/her hospital
  addDoctor(){
    this.dialog.open(AddDoctorDialogComponent, {
      width: '30%'
    })
  }

  //link a product for online service
  linkProduct(){
    this.dialog.open(LinkProductDialogComponent, {
      width: '30%'
    })
  }
}
