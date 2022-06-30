import { Hospital } from "./Hospital";
import { Patient } from "./Patient";

export class AppointmentRequest{
    patientId: string;
    hospital: Hospital;
    date: Date;
    time: string;
    bookingId: string;
    constructor(){
        this.hospital= new Hospital();
        this.patientId= '';
        this.date= new Date();
        this.time= '';
        this.bookingId= '';
    }
}