import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { FilterOptions } from 'src/app/common/FilterOptions';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { ConverterUtil } from 'src/app/util/ConverterUtil';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {

  form !: FormGroup;
  @Input() formGroupName !: string;
  
  //displays filtered options to user
  filteredOptions: string[]= [];
  labs: string[]= [];

  constructor(
    private fb: FormBuilder, 
    private hospitalService: HospitalService,
    private rootFormGroup: FormGroupDirective, 
    private filterOptions: FilterOptions,
    private converterUtil: ConverterUtil,
    private resMsg: DisplayResponseMessages
    ) { 
      this.form= this.fb.group({
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
        
      });
  }

  ngOnInit(): void {
      this.form= this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  //event handler
  populateLabs(){
    this.getLabs();
    
    this.form.controls['labFC'].valueChanges.subscribe(val=> {
      this.filteredOptions= this.filterOptions._filter(this.labs, val);
    });
  }

  //find labs
  private getLabs(){
    let state= this.form.get('searchHospital.areaInfo.stateFC')?.value;
    let district= this.form.get('searchHospital.areaInfo.districtFC')?.value;;
    let pincode= this.form.get('searchHospital.areaInfo.pincodeFC')?.value;;
    let areaName= this.form.get('searchHospital.areaInfo.areaNameFC')?.value;;
    let hospitalName= this.form.get('searchHospital.hospitalFC')?.value;
    
    this.hospitalService.findLabs().subscribe({
      next: (res)=> {
          console.log(res);
          
          this.labs= this.converterUtil.getLablNames(res, hospitalName);
      },
      error: (err)=> {
          console.log(err);
          this.resMsg.displaySnackBar('Error while finding labs');          
      }
    })
  }
}

