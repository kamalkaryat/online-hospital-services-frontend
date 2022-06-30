import { Lab } from "./Lab";
import { Patient } from "./Patient";

export interface TestSample{
	testSampleId: string;
	collectionDate: Date;
	receivedDate: Date;
	patient: Patient;
	lab: Lab;
}
