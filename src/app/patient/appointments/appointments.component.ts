import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { AptRescheduleDialogComponent } from 'src/app/dialogs/apt-reschedule-dialog/apt-reschedule-dialog.component';
import { BookedAppointmentDto } from 'src/app/models/BookedAppointmentDto';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { PatientService } from 'src/app/services/patient-service/patient.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  //table header
  displayedColumns: string[] = ['bookingId', 'hospitalName','aptDate','aptTime','action'];

  //datasource
  dataSource!: MatTableDataSource<BookedAppointmentDto>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService, private dialog: MatDialog, 
    private resMsg: DisplayResponseMessages, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Booked-Appointments');
      this.getBookedAppointments();
   }

  getBookedAppointments(){
      this.patientService.findBookedAppointments().subscribe({
        next: (res)=>{
          this.dataSource= new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err)=>{
            console.log('Error while finding booked appointments');
            this.resMsg.displaySnackBar('Error: '+err.error);
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   //edit appointment event handler
   editAppointment(row: any): void {
    this.dialog.open(AptRescheduleDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
        this.getBookedAppointments();
    })
  }

  //delete appointment
  deleteAppointment(id: string){
    alert('deleting appointments');
    this.patientService.cancelAppointment(id).subscribe({
      next: (res)=>{
          this.getBookedAppointments();
          console.log('appointment deleted');
          this.resMsg.displaySnackBar('Appointment Cancelled');
      },
      error: (err)=>{
          console.log('error while deleting appoitment');
          this.resMsg.displaySnackBar('Error: '+err.error);
      }
    })
  }
}
