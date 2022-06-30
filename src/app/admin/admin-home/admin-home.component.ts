import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AddHospitalAdminDialogComponent } from 'src/app/dialogs/add-hospital-admin-dialog/add-hospital-admin-dialog.component';
import { AddHospitalDialogComponent } from 'src/app/dialogs/add-hospital-dialog/add-hospital-dialog.component';
import { AddLabDialogComponent } from 'src/app/dialogs/add-lab-dialog/add-lab-dialog.component';
import { ProductDialogComponent } from 'src/app/dialogs/product-dialog/product-dialog.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Home');
  }

  //add hospital
  addHospital(){
    this.dialog.open(AddHospitalDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'hospitalSaved')
        alert('hospital saved')
    })
  }
  
  //add hospital-admin
  addHospitalAdmin(){
    this.dialog.open(AddHospitalAdminDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'hospitalAdminSaved')
        alert('hospital-admin saved')
    })
  }

  //add product
  addProduct(){
    this.dialog.open(ProductDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'productSaved')
        alert('product saved')
    })
  }

  //add product
  addLab(){
    this.dialog.open(AddLabDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'LabSaved')
        alert('lab saved')
    })
  }
}
