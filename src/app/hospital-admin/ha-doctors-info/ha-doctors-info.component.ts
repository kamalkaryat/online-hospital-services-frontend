import { Component, OnInit } from '@angular/core';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Doctor } from 'src/app/models/Doctor';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';

@Component({
  selector: 'app-ha-doctors-info',
  templateUrl: './ha-doctors-info.component.html',
  styleUrls: ['./ha-doctors-info.component.css']
})
export class HaDoctorsInfoComponent implements OnInit {

  displayedColumns: string[] = ['doctorId', 'doctorName', 'doctorGender', 'doctorDob','doctorQualification', 
       'doctorDept','hospital', 'login.enabled', 'action'];

  dataSource!: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
      private haService: HospitalAdminService,
      private resMsg: DisplayResponseMessages,
      private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Doctors');
    this.getDoctors();
  }
  
  //call hospital-service api to get doctors
  getDoctors(){
    
    this.haService.findDoctors().subscribe(
        {
          next: (res) =>{            
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err) =>{
              console.log('Error while finding doctors');
              this.resMsg.displaySnackBar('Error while finding doctors!')
          }
        }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  manageDoctor(doctor: any){
      const action= doctor.login.enabled ? 'disable' : 'enable';
      this.haService.manageDoctor(action, doctor.login.username).subscribe(
        {
          next: (res) =>{
              this.resMsg.displaySnackBar('Action Successful');
              this.getDoctors();
          },
          error: (err) =>{
              console.log('Error while disabling doctor');
              this.resMsg.displaySnackBar('Action Failed!'+err.message);
          }
        }
    );
  }
}