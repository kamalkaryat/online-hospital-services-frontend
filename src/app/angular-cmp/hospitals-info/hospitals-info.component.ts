import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Hospital } from 'src/app/models/Hospital';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';

@Component({
  selector: 'app-hospitals-info',
  templateUrl: './hospitals-info.component.html',
  styleUrls: ['./hospitals-info.component.css']
})
export class HospitalsInfoComponent implements OnInit {

  displayedColumns: string[] = ['hospitalId', 'hospitalName', 'hospitalType', 'hospitalPhoneNo',
      'hospitalEmail', 'area','hospitalStatus', 'action'];

  dataSource!: MatTableDataSource<Hospital>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
      private hospitalService: HospitalService, 
      private adminService: AdminService,
      private resMsg: DisplayResponseMessages,
      private title: Title) { }
 
  ngOnInit(): void {
    this.title.setTitle('Hospitals');
    this.getHospitals();
  }
  
  //call admin-service to get doctors
  public getHospitals(){
    this.adminService.findAllHospitals().subscribe(
        {
          next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err) =>{
              console.log('Error while finding hospitals');
              this.resMsg.displaySnackBar('Error while finding hospitals');
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

  manageHospital(hospital: any){
      
      const action= hospital.hospitalStatus ? 'disable' : 'enable';
      this.adminService.manageHospital(action, hospital.hospitalId).subscribe({
        next: (res)=>{
            this.resMsg.displaySnackBar('Operation Successful');
            this.getHospitals();
        },
        error: (err)=>{
          console.log('error while enabling hospital');
          this.resMsg.displayErrorCategoryAndMessage('Error', err.message);
        }        
      })
  }
}
