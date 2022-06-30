export class BookedAppointmentDto{
    bookingId: string;
    hospitalName: string;
    aptDate: Date;
    aptTime: string;

    constructor(){
        this.hospitalName= '';
        this.bookingId= '';
        this.aptDate= new Date();
        this.aptTime= '';
    }
}