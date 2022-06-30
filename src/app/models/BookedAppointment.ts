import { Appointment } from "./Appointment";
import { Patient } from "./Patient";

export class BookedAppointment{
	bookingId: string;
	patient: Patient;
	appointment: Appointment;

	constructor(){
		this.bookingId= '';
		this.patient= new Patient();
		this.appointment= new Appointment();
	}
}