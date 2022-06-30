import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  form!: FormGroup;
  @Input() formGroupName !: string;

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
      this.form= this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

}
