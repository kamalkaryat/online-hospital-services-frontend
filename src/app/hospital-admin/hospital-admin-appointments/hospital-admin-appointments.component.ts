import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Appointment } from 'src/app/models/Appointment';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';
import { DateTimeUtil } from 'src/app/util/dateTimeUtil';

@Component({
  selector: 'app-hospital-admin-appointments',
  templateUrl: './hospital-admin-appointments.component.html',
  styleUrls: ['./hospital-admin-appointments.component.css']
})
export class HospitalAdminAppointmentsComponent implements OnInit {

  displayedColumns: string[] = ['appointmentId', 'appointmentDate', 'appointmentTime', 'totalAppointments'];

today= new Date();

dataSource!: MatTableDataSource<Appointment>;

@ViewChild(MatPaginator)paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor(
private resMsg: DisplayResponseMessages,
private haService: HospitalAdminService,
private title: Title) { }

ngOnInit(): void {
    this.title.setTitle('Appointments');
    this.findAppointments();
}

private appointments: Appointment[]= [];
//call hospital-service api to get doctors
public findAppointments(){
  
  this.haService.findAppointmentsInHospital().subscribe({
     next: (res) =>{
       this.dataSource= new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.appointments= res;
       
     },
     error: (err) =>{
         console.log('Error while finding appointments');
         this.resMsg.displayErrorCategoryAndMessage('Error!', 'Appointments Not Found');
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

  isOlderAppointment(date: any): boolean{
      let dtUtil= new DateTimeUtil();
      let d= new Date(date)

      let tmp= dtUtil.localDateConverter(this.today);
      const currDate= new Date(tmp+'');
          
      const td= this.today+'';
      return d < currDate;
  }

    deleteApt(apt: any){
    
        this.haService.removeAppointment(apt.appointmentId).subscribe({
          next: (res)=>{
              this.resMsg.displaySnackBar('Operation Successful');
              this.findAppointments();
          },
          error: (err)=>{
              console.error('Error while deleteing appointment ');            
              this.resMsg.displayErrorCategoryAndMessage('Error', err.error);
          }
        })
    }

    editApt(apt: any){

    }
}
