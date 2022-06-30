import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestRequestsComponent } from 'src/app/hospital-admin/test-requests/test-requests.component';
import { Area } from 'src/app/models/Area';
import { Hospital } from 'src/app/models/Hospital';
import { Lab } from 'src/app/models/Lab';
import { Product } from 'src/app/models/Product';
import { TestRequest } from 'src/app/models/TestRequest';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { PatientService } from 'src/app/services/patient-service/patient.service';

@Component({
  selector: 'app-new-test-dialog',
  templateUrl: './new-test-dialog.component.html',
  styleUrls: ['./new-test-dialog.component.css']
})
export class NewTestDialogComponent implements OnInit {
  today= new Date();
  form !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private resMsg: DisplayResponseMessages) { }

  ngOnInit(): void {
      this.form= this.fb.group({
        testDateFC: [new Date(), Validators.required],
        testFC: ['', Validators.required],
        lab: this.fb.group({
          labFC: [''],
          searchHospital: this.fb.group({
            hospitalFC: [''],
            areaInfo: this.fb.group({
              stateFC: [''],
              districtFC: [''],
              pincodeFC: [''],
              areaNameFC: ['']
            })
          })
        })
      })
  }

  onSubmit(){
    this.patientService.testRequest(this.toTestRequest()).subscribe({
      next: (res) =>{
          this.resMsg.displaySnackBar('Request Sent in Lab');
      },
      error: (err) =>{
          console.log('Error while placing test request');
          this.resMsg.displayErrorCategoryAndMessage('Request Not Placed', err.message);
      }
    })
  }

  toTestRequest(): TestRequest{
    let tr= new TestRequest();

    let product= new Product();
    product.productName= this.form.controls['testFC'].value;
    product.productCategory= 'test';

    tr.product= product;

    tr.datetime= new Date();
    
    let lab= new Lab();
    lab.labName= this.form.get('lab.labFC')?.value;

    let hospital= new Hospital();

    let hName= this.form.get('lab.searchHospital.hospitalFC');
    let tmp= hName?.value;
    hospital.hospitalName= tmp;

    let area= new Area();
    area.state=this.form.get('lab.searchHospital.areaInfo.stateFC')?.value ; 
    
    hospital.area= area;
    lab.hospital= hospital; 

    tr.lab= lab;
    console.log(tr);
    
    return tr;
  }
}
