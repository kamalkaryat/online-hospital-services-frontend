import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { FilterOptions } from 'src/app/common/FilterOptions';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { ConverterUtil } from 'src/app/util/ConverterUtil';

@Component({
  selector: 'app-search-hospital',
  templateUrl: './search-hospital.component.html',
  styleUrls: ['./search-hospital.component.css']
})
export class SearchHospitalComponent implements OnInit {

  form !: FormGroup;
  @Input() formGroupName !: string;
  
  //displays filtered options to user
  filteredOptions: string[]= [];
  hospitals: string[]= [];

  constructor(
    private fb: FormBuilder, 
    private rootFormGroup: FormGroupDirective, 
    private filterOptions: FilterOptions, 
    private hospitalService: HospitalService, 
    private resMsg: DisplayResponseMessages,
    private converterUtil: ConverterUtil) {
      this.form= this.fb.group({
        hospitalFC: [''],
        areaInfo: this.fb.group({
          stateFC: [''],
          districtFC: [''],
          pincodeFC: [''],
          areaNameFC: ['']
        })
      });
  }

  ngOnInit(): void {
      this.form= this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  populateHospitals(){
    this.getHospitals();

    this.form.controls['hospitalFC'].valueChanges.subscribe(val=> {
      this.filteredOptions= this.filterOptions._filter(this.hospitals, val);
    });
  }

  private getHospitals(){
    let state= this.form.get('areaInfo.stateFC')?.value;
    let district= this.form.get('areaInfo.districtFC')?.value;
    let pincode= this.form.get('areaInfo.pincodeFC')?.value;
    let areaName= this.form.get('areaInfo.areaNameFC')?.value;
    let hospital= this.form.controls['hospitalFC'].value;
    const filters=  'state:'+state+',district:'+district+',pincode:'+pincode+',areaName:'+areaName;
    
    if(state === ''){
      this.resMsg.displaySnackBar('State is required to search hospitals!');
      return;
    }
    this.hospitalService.findHospitals(filters).subscribe({
      next: (res) =>{
         this.hospitals= this.converterUtil.getHospitalNames(res, state);        
      },
      error: (err) =>{
        console.log('Error while finding hospitals');
        this.resMsg.displaySnackBar('Hospitals Not Found!');
      }
    })
  }
}
