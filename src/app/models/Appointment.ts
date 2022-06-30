import { threadId } from "worker_threads";
import { Hospital } from "./Hospital";

export class Appointment{
	appointmentId: string;
	appointmentDate: Date;
	appointmentTime: string;
	totalAppointments: number;
	appointmentAvailable: number;
	hospital: Hospital;

	constructor(){
		this.appointmentId= '';
		this.appointmentDate= new Date();
		this.totalAppointments= -1;
		this.appointmentTime= '';
		this.hospital= new Hospital();
		this.appointmentAvailable= -1;
	}
}