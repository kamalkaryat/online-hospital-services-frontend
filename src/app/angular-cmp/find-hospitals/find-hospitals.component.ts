import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/models/Hospital';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';

@Component({
  selector: 'app-find-hospitals',
  templateUrl: './find-hospitals.component.html',
  styleUrls: ['./find-hospitals.component.css']
})
export class FindHospitalsComponent implements OnInit {

  constructor(private hospitalService: HospitalService, private resMsg: DisplayResponseMessages) { }

  public hospitals: Hospital[]= [];
  
  ngOnInit(): void {  }

  findHospitals(){
    this.getHospitals();
  }
  public getHospitals(){
    let filters= '';
    this.hospitalService.findHospitals(filters).subscribe({
      next: (response)=>{
          this.hospitals= response;
          
      },
      error: (err)=>{
        console.error('Error in finding hospital');
        this.resMsg.displaySnackBar('Hospitals Not Found!');
      }
    })
  }
}
