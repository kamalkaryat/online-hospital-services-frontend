import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/Doctor';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';

@Component({
  selector: 'app-find-doctors',
  templateUrl: './find-doctors.component.html',
  styleUrls: ['./find-doctors.component.css']
})
export class FindDoctorsComponent implements OnInit {

  public doctors: Doctor[]= [];
  constructor(private hospitalService: HospitalService, private resMsg: DisplayResponseMessages) { }


  ngOnInit(): void {    }

  findDoctors(){
      this.getDoctors();
  }

  public getDoctors(){
    let filters= 'none';
    this.hospitalService.findDoctors(filters).subscribe({
      next: (res) =>{
          this.doctors= res;
      },
      error: (err) =>{
        console.log("doctors not found");
        this.resMsg.displaySnackBar('Doctors Not Found!');
      }
    })
  }

}
