import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Lab } from 'src/app/models/Lab';
import { LabDetails } from 'src/app/models/LabDetails';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';

@Component({
  selector: 'app-lab-info',
  templateUrl: './lab-info.component.html',
  styleUrls: ['./lab-info.component.css']
})
export class LabInfoComponent implements OnInit {


  displayedColumns: string[] = ['labId', 'labName','labType','hospital', 'area', 'status','action'];
  
  dataSource!: MatTableDataSource<LabDetails>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private hospitalService: HospitalService, 
    private resMsg: DisplayResponseMessages,
    private adminService: AdminService,
    private title: Title
    ) { }
  
    ngOnInit(): void {
      this.title.setTitle('Labs');
      this.getLabs();
    }
  
  //call hospital-service api to get doctors
  public getLabs(){
    let ld= new LabDetails();
    this.adminService.findAllLabs().subscribe(
        {
          next: (res) =>{
            const lds=  ld.convertToLabDetail(res);
            this.dataSource= new MatTableDataSource(lds);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err) =>{
              console.log('Error while finding labs');
              this.resMsg.displaySnackBar('Labs Not Found!');
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

  manageLab(row: any){
    console.log(row);
    const action= row.status ? 'disable' : 'enable';
    
    this.adminService.manageLab(action, row.labId).subscribe({
      next: (res)=>{
          this.resMsg.displaySnackBar('Success');
          this.getLabs();
      },
      error: (err)=>{
          console.log('Error while enabling/disabling lab');
          this.resMsg.displaySnackBar('Error:'+err.message);
      }
    })
  }
}
