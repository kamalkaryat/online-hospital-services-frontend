import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Password } from 'src/app/models/Password';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  form !: FormGroup;

  //this name will come from parent component where it used as a child
  @Input() formGroupName !: string;     

  constructor(private rootFormGroup: FormGroupDirective) {   }

  ngOnInit(): void {
    this.form= this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
