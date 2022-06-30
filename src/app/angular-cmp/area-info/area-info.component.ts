import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { FilterOptions } from 'src/app/common/FilterOptions';
import { Area } from 'src/app/models/Area';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AreaService } from 'src/app/services/area-service/area.service';

@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.component.html',
  styleUrls: ['./area-info.component.css']
})
export class AreaInfoComponent implements OnInit {
  
  //@Output() addArea: EventEmitter<Area>= new EventEmitter();
  
  @Input() formGroupName !: string;
  form!: FormGroup;

  //html elements reference
  @ViewChild('state') stateRef !: ElementRef;
  @ViewChild('district') districtRef !: ElementRef;
  @ViewChild('pincode') pincodeRef !: ElementRef;

  //these arrays will hold states, districts, areaNames & pincodes details
  states: string[] = [];
  districts: string[] = [];
  areaNames: string[] = [];
  pincodes: string[] = [];

  //displays filtered options to user
  filteredOptions: string[]= [];

  showAutocomplete: boolean= false;

  constructor(private areaService: AreaService, private rootFormGroup: FormGroupDirective, 
    private fb: FormBuilder, private resMsg: DisplayResponseMessages, 
    private filterOptions: FilterOptions){ 
      this.form= this.fb.group({
        stateFC: [''],
        districtFC: [''],
        pincodeFC: [''],
        areaNameFC: [''],
      })
  }

  ngOnInit() {  
    this.form= this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  public populateStates(){
    
    let stateValue= this.form.controls['stateFC'].value;

    if(this.states.length==0)
      this.getStates();
    
    //reset dependent elements
    if(stateValue === ''){
        this.districts= [];
        this.form.controls['districtFC'].setValue('');
        
        this.pincodes= [];
        this.form.controls['pincodeFC'].setValue('');

        this.areaNames= [];
        this.form.controls['areaNameFC'].setValue('');
    }

    this.form.controls['stateFC'].valueChanges.subscribe(val=> {
        this.filteredOptions= this.filterOptions._filter(this.states, val);
    });

  }
  //get states
  private getStates(){
    this.areaService.findStates().subscribe({
      next: (res) =>{
        this.states= res;        
      },
      
      error: (err) =>{
        console.log('Error while finding states');
        this.resMsg.displaySnackBar('States Not Found');
      }
   })
  }
  
  
  populateDistricts(){
    let districtValue= this.form.controls['districtFC'].value;

    if(this.districts.length===0)  
        this.getDistricts();
    
    //reset dependent elements
    if(districtValue === ''){
      
      this.pincodes= [];
      this.form.controls['pincodeFC'].setValue('');

      this.areaNames= [];
      this.form.controls['areaNameFC'].setValue('');
    }

    this.form.controls['districtFC'].valueChanges.subscribe(val=> {
          this.filteredOptions= this.filterOptions._filter(this.districts, val);
    });
  }
  //find districts
  private  getDistricts(){
    const state= this.form.controls['stateFC'].value;
    if(state === ''){
      this.resMsg.displaySnackBar('State is required!');
      return;
    }
    this.areaService.findDistricts(state).subscribe({
      next: (res) =>{
        
        this.districts= res;
      },
      error: (err) =>{
        console.log('Error while finding districts');
        this.resMsg.displaySnackBar('Districts Not Found');
      }
    })
  }

  populatePincodes(){
    let pincodeValue= this.form.controls['pincodeFC'].value;

    if(this.pincodes.length==0)  
        this.getPincodes();
      
    //reset dependent elements
    if(pincodeValue === ''){
      this.areaNames= [];
      this.form.controls['areaNameFC'].setValue('');
  }
    this.form.controls['pincodeFC'].valueChanges.subscribe(val=> {
          this.filteredOptions= this.filterOptions._filter(this.pincodes, val);
    });
  }
  //find pincodes
  private getPincodes(){
    let state= this.form.controls['stateFC'].value;
    let district= this.form.controls['districtFC'].value;

    if(state === '' || district === ''){
      this.resMsg.displaySnackBar('State & District are required!');
      return;
    }
    this.areaService.findPincodes(state, district).subscribe({
      next: (response: number[]) =>{
        this.pincodes= response.map(String);
      },
      error: (err) =>{
        console.log('Error while finding pincodes');
        this.resMsg.displaySnackBar('Pincodes Not Found');
      }
    });
  }

  populateAreaNames(){
    if(this.areaNames.length==0)  
        this.getAreaNames();
      
    this.form.controls['areaNameFC'].valueChanges.subscribe(val=> {
          this.filteredOptions= this.filterOptions._filter(this.areaNames, val);
    });
  }
  //find areaName
  private getAreaNames(){
    let state= this.form.controls['stateFC'].value;
    let district= this.form.controls['districtFC'].value;
    let pincode= this.form.controls['pincodeFC'].value;

    if(state === '' || district === '' || pincode === ''){
      this.resMsg.displaySnackBar('State , District & Pincode are required!');
      return;
    }
    this.areaService.findAreaNames(state, district, pincode).subscribe({
      next: (res) =>{
        this.areaNames= res.map(String);
      },
      error: (err) =>{
        console.log('Error while finding area-names');
        this.resMsg.displaySnackBar('AreaNames Not Found');
      }
    });
  }

}
