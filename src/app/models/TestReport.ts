import { TestOrder } from "./TestOrder";

export interface TestReport{
	testReportId: string;
	testReportDate: Date;
	testReportInfo: Blob;
	testOrder: TestOrder;
}