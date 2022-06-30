import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MDialogComponent } from 'src/app/angular-cmp/m-dialog/m-dialog.component';
import { BookedAppointment } from 'src/app/models/BookedAppointment';
import { BookedAppointmentDto } from 'src/app/models/BookedAppointmentDto';
import { PatientService } from 'src/app/services/patient-service/patient.service';
import { BookProductComponent } from '../book-product/book-product.component';

@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.css']
})
export class CancelAppointmentComponent implements OnInit {

 
  displayedColumns: string[] = ['bookingId', 'aptDate', 'aptTime','hospitalName',
        'action'];

  dataSource!: MatTableDataSource<BookedAppointmentDto>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patService: PatientService, public dialog: MatDialog) { }

  //open a dialog54
  openDialog() {
    const dialogRef = this.dialog.open(MDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    //this.getBookedAppointment();
  }
  
  //TODO- : CALL Patient-API
  public getBookedAppointment(){
    
    this.patService.findBookedAppointments().subscribe(
        {
          next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(res);
          },
          error: (err) =>{
              console.log('Error while finding appointments');
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
}