import { Patient } from "./Patient";

export class AppointmentRescheduleRequest{
    bookingId: string;
	patientId: string;
	appointmentId: string;

	constructor(){
		this.bookingId= '';
		this.appointmentId= '';
		this.patientId= '';
	}
}