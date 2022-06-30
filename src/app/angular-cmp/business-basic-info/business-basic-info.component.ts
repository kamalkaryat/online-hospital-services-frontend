import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-business-basic-info',
  templateUrl: './business-basic-info.component.html',
  styleUrls: ['./business-basic-info.component.css']
})
export class BusinessBasicInfoComponent implements OnInit {

  form !: FormGroup;
  @Input() formGroupName !: string;
  types:string[]= ['GOVERNMENT', 'PRIVATE', 'OTHER'];
  
  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form= this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

}
