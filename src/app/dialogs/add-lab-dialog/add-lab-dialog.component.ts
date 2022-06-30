import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/models/Area';
import { Hospital } from 'src/app/models/Hospital';
import { Lab } from 'src/app/models/Lab';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-add-lab-dialog',
  templateUrl: './add-lab-dialog.component.html',
  styleUrls: ['./add-lab-dialog.component.css']
})
export class AddLabDialogComponent implements OnInit {

  labForm: FormGroup;
  btnName= 'Save';

  constructor(private fb: FormBuilder, private adminService: AdminService,
      @Inject(MAT_DIALOG_DATA) public labData: any,  
      public dialogRef: MatDialogRef<AddLabDialogComponent>,  private resMsg: DisplayResponseMessages) {
    
      this.labForm= this.fb.group({
      
        searchHospital: this.fb.group({
          hospitalFC: ['', Validators.required],
          areaInfo: this.fb.group({
            stateFC: ['', Validators.required],
            districtFC: ['', Validators.required],
            pincodeFC: ['', Validators.required],
            areaNameFC: ['', Validators.required]
          })
        }),
        labNameFC: ['', Validators.required]
    })
  }

  ngOnInit(): void {  }  

  onBtnClick(){
      if(this.labForm.valid){
          this.saveLab();
          this.labForm.reset();
      }
      else
          this.resMsg.displaySnackBar('Some fields are invalid!');
  }

  private saveLab(){
    this.adminService.addLab(this.toLab()).subscribe({
      next:(res)=>{
          this.resMsg.displaySnackBar('Lab Registered');
          this.dialogRef.close('labSaved');
      },
      error:(err)=>{
          console.log(err);
          this.resMsg.displayErrorCategoryAndMessage("Registration Failed", err.error.text);
          this.dialogRef.close('labNotSaved');
      }
    })
  }

  //create lab dto
  private toLab(): Lab{
      let labName= this.labForm.get('labNameFC');

      let hospitalName= this.labForm.get('searchHospital.hospitalFC'); 

      let state= this.labForm.get('searchHospital.areaInfo.stateFC');
      let district= this.labForm.get('searchHospital.areaInfo.districtFC');;
      let pincode= this.labForm.get('searchHospital.areaInfo.pincodeFC');;
      let areaName= this.labForm.get('searchHospital.areaInfo.areaNameFC');;
      
      let area= new Area();
      area.state= state?.value;
      area.district= district?.value;
      area.pincode= pincode?.value;
      area.areaName= areaName?.value;

      let hospital = new Hospital();
      hospital.hospitalName= hospitalName?.value;
      hospital.area= area;

      let lab= new Lab();
      lab.labName= labName?.value;
      lab.hospital= hospital;
      
      console.log(lab);
      
      return lab;
  }
}
