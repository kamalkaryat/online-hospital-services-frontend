import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { HospitalAdmin } from 'src/app/models/HospitalAdmin';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';

@Component({
  selector: 'app-hospital-admins-info',
  templateUrl: './hospital-admins-info.component.html',
  styleUrls: ['./hospital-admins-info.component.css']
})
export class HospitalAdminsInfoComponent implements OnInit {

  
  //displayedColumns: string[] = ['patientId', 'name', 'qualification', 'category', 'hospital'];
  displayedColumns: string[] = ['hospitalAdminId', 'hospitalAdminName', 'hospitalAdminDob','hospitalAdminGender','hospitalAdminPhoneNo', 
       'login','hospital', 'login.enabled','action'];

  dataSource!: MatTableDataSource<HospitalAdmin>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private resMsg: DisplayResponseMessages,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Hospital-Admins');
    this.getHospitalAdmins();    
  }
  
  //call hospital-service api to get doctors
  public getHospitalAdmins(){
    
    this.adminService.findAllHospitalAdmins().subscribe(
        {
          next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err) =>{
              console.log('Error while finding hospital-admins');
              this.resMsg.displaySnackBar('Error while finding Hospital-Admins!');
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

  //TODO
  manageHospitalAdmin(ha: any){
    let action= ha.login.enabled ? 'disable' : 'enable';
    this.adminService.manageUsers(action, ha.login.username).subscribe({
      next: (res)=>{
          this.resMsg.displaySnackBar('Operation Successful');
          this.getHospitalAdmins();
      },
      error: (err)=>{
          console.error('Error while enabling or disabling hospital-admin');
          this.resMsg.displayErrorCategoryAndMessage('Error', err.message);
      }
    })
  }
}

