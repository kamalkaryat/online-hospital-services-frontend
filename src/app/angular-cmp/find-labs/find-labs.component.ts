import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { Lab } from 'src/app/models/Lab';
import { HttpErrorResponse } from '@angular/common/http';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { LabDetails } from 'src/app/models/LabDetails';
@Component({
  selector: 'app-find-labs',
  templateUrl: './find-labs.component.html',
  styleUrls: ['./find-labs.component.css']
})
export class FindLabsComponent implements OnInit {

  labDetails: LabDetails[]= [];

  constructor(private hospitalSerive: HospitalService, private resMsg: DisplayResponseMessages) { }

  ngOnInit(): void {  }

  findLabs(){
      this.getLabs();
  }
  public getLabs(){
    let ld= new LabDetails();
    this.hospitalSerive.findLabs().subscribe({
      next: (res) =>{
          this.labDetails= ld.convertToLabDetail(res);
      },
      error: (err) =>{
          console.log("Error while finding the labs");
          this.resMsg.displaySnackBar('Labs Not Found!');
      }
    })
  }
}
