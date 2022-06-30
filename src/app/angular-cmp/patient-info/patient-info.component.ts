import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Patient } from 'src/app/models/Patient';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  displayedColumns: string[] = ['patientId', 'patientName', 'patientDob', 'patientGender',
       'login','area','login.enabled','action'];

  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private resMsg: DisplayResponseMessages,
    private adminService: AdminService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Patients');
    this.getPatients();
  }
  
  private patients: Patient[]= [];
  //call hospital-service api to get doctors
  public getPatients(){
    
    this.adminService.findAllPatients().subscribe({
          next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.patients= res;
          },
          error: (err) =>{
              console.log('Error while finding patients');
              this.resMsg.displayErrorCategoryAndMessage('Patients Not Found', err.message);
          }
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  managePatient(patient: any){
      let action= patient.login.enabled ? 'disable' : 'enable';
      this.adminService.manageUsers(action, patient.login.username).subscribe({
        next: (res)=>{
            this.resMsg.displaySnackBar('Operation Successful');
            this.getPatients();
        },
        error: (err)=>{
            console.error('Error while enabling or disabling patient');            
            this.resMsg.displayErrorCategoryAndMessage('Error', err.message);
        }
      })
  }
}
