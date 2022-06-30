import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NewTestDialogComponent } from 'src/app/dialogs/new-test-dialog/new-test-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private title: Title, private dialog: MatDialog) { }

  ngOnInit(): void { 
    this.title.setTitle('Home');
  }

  newTestRequest(){
    this.dialog.open(NewTestDialogComponent, {
      width: '30%'
    })
  }
}
