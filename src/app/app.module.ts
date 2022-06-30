import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { SignupComponent } from './pages/signup/signup.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './common/navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';

import { AuthInterceptor, authInterceptorProviders } from './auth/AuthInterceptor';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { HospitalAdminDashboardComponent } from './hospital-admin/hospital-admin-dashboard/hospital-admin-dashboard.component';
import { DisplayResponseMessages } from './ResponseMessages/DisplayResponseMessages';
import { PatientSidebarComponent } from './patient/patient-sidebar/patient-sidebar.component';
import { ProfileComponent } from './patient/profile/profile.component';
import { AppointmentsComponent } from './patient/appointments/appointments.component';
import { TestsComponent } from './patient/tests/tests.component';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { IndexComponent } from './common/index/index.component';
import { FindDoctorsComponent } from './angular-cmp/find-doctors/find-doctors.component';
import { FindHospitalsComponent } from './angular-cmp/find-hospitals/find-hospitals.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouseMedical, fas } from '@fortawesome/free-solid-svg-icons';
import { FindProductsComponent } from './angular-cmp/find-products/find-products.component';
import { AreaInfoComponent } from './angular-cmp/area-info/area-info.component';
import { FindLabsComponent } from './angular-cmp/find-labs/find-labs.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HomeComponent } from './patient/home/home.component';
import { HospitalAdminComponent } from './admin/hospital-admin/hospital-admin.component';
import { HospitalComponent } from './admin/hospital/hospital.component';
import { PatientComponent } from './admin/patient/patient.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { HospitalAdminHomeComponent } from './hospital-admin/hospital-admin-home/hospital-admin-home.component';
import { HospitalAdminSidebarComponent } from './hospital-admin/hospital-admin-sidebar/hospital-admin-sidebar.component';
import { HospitalAdminAppointmentsComponent } from './hospital-admin/hospital-admin-appointments/hospital-admin-appointments.component';
import { HospitalAdminProfileComponent } from './hospital-admin/hospital-admin-profile/hospital-admin-profile.component';
import { PatientInfoComponent } from './angular-cmp/patient-info/patient-info.component';
import { DoctorsInfoComponent } from './angular-cmp/doctors-info/doctors-info.component';
import { HospitalsInfoComponent } from './angular-cmp/hospitals-info/hospitals-info.component';
import { ProductsInfoComponent } from './angular-cmp/products-info/products-info.component';
import { HospitalAdminsInfoComponent } from './angular-cmp/hospital-admins-info/hospital-admins-info.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LabInfoComponent } from './angular-cmp/lab-info/lab-info.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PasswordComponent } from './angular-cmp/password/password.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { ViewAppointmentComponent } from './patient/view-appointment/view-appointment.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import { CancelAppointmentComponent } from './patient/cancel-appointment/cancel-appointment.component';
import { RescheduleAppointmentComponent } from './patient/reschedule-appointment/reschedule-appointment.component';
import { BookProductComponent } from './patient/book-product/book-product.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MDialogComponent } from './angular-cmp/m-dialog/m-dialog.component';
import { ProductDialogComponent } from './dialogs/product-dialog/product-dialog.component';
import { AptRescheduleDialogComponent } from './dialogs/apt-reschedule-dialog/apt-reschedule-dialog.component';
import { BookProductDialogComponent } from './dialogs/book-product-dialog/book-product-dialog.component';
import { PurchasedProductsComponent } from './patient/purchased-products/purchased-products.component';
import { AddLabDialogComponent } from './dialogs/add-lab-dialog/add-lab-dialog.component';
import { AddHospitalAdminDialogComponent } from './dialogs/add-hospital-admin-dialog/add-hospital-admin-dialog.component';
import { AddHospitalDialogComponent } from './dialogs/add-hospital-dialog/add-hospital-dialog.component';
import { AddressInfoComponent } from './angular-cmp/address-info/address-info.component';
import { BasicInfoComponent } from './angular-cmp/basic-info/basic-info.component';
import { ForgotPswComponent } from './pages/forgot-psw/forgot-psw.component';
import { HospitalProfileComponent } from './profiles/hospital-profile/hospital-profile.component';
import { DoctorProfileComponent } from './profiles/doctor-profile/doctor-profile.component';
import { LabProfileComponent } from './profiles/lab-profile/lab-profile.component';
import { AddDoctorDialogComponent } from './dialogs/add-doctor-dialog/add-doctor-dialog.component';
import { AddAppointmentDialogComponent } from './dialogs/add-appointment-dialog/add-appointment-dialog.component';
import { LinkProductDialogComponent } from './dialogs/link-product-dialog/link-product-dialog.component';
import { BusinessBasicInfoComponent } from './angular-cmp/business-basic-info/business-basic-info.component';

import {FilterOptions} from './common/FilterOptions';
import { LabComponent } from './angular-cmp/lab/lab.component';
import { ConverterUtil } from './util/ConverterUtil';
import { SearchHospitalComponent } from './angular-cmp/search-hospital/search-hospital.component';
import { NewTestDialogComponent } from './dialogs/new-test-dialog/new-test-dialog.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { TestRequestsComponent } from './hospital-admin/test-requests/test-requests.component';
import { ProductStockComponent } from './hospital-admin/product-stock/product-stock.component';
import { StockUpdateDialogComponent } from './hospital-admin/stock-update-dialog/stock-update-dialog.component';
import { TestStatusUpdateDialogComponent } from './hospital-admin/test-status-update-dialog/test-status-update-dialog.component';
import { HaDoctorsInfoComponent } from './hospital-admin/ha-doctors-info/ha-doctors-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    AdminDashboardComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    HospitalAdminDashboardComponent,
    PatientSidebarComponent,
    ProfileComponent,
    AppointmentsComponent,
    TestsComponent,
    IndexComponent,
    FindDoctorsComponent,
    FindHospitalsComponent,
    FindProductsComponent,
    AreaInfoComponent,
    FindLabsComponent,
    HomeComponent,
    HospitalAdminComponent,
    HospitalComponent,
    PatientComponent,
    AdminSidebarComponent,
    AdminHomeComponent,
    HospitalAdminHomeComponent,
    HospitalAdminSidebarComponent,
    HospitalAdminAppointmentsComponent,
    HospitalAdminProfileComponent,
    PatientInfoComponent,
    DoctorsInfoComponent,
    ProductsInfoComponent,
    HospitalAdminsInfoComponent,
    LabInfoComponent,
    PasswordComponent,
    BookAppointmentComponent,
    ViewAppointmentComponent,
    CancelAppointmentComponent,
    RescheduleAppointmentComponent,
    BookProductComponent,
    MDialogComponent,
    ProductDialogComponent,
    AptRescheduleDialogComponent,
    BookProductDialogComponent,
    PurchasedProductsComponent,
    AddLabDialogComponent,
    AddHospitalAdminDialogComponent,
    AddHospitalDialogComponent,
    AddressInfoComponent,
    BasicInfoComponent,
    ForgotPswComponent,
    HospitalProfileComponent,
    DoctorProfileComponent,
    LabProfileComponent,
    AddDoctorDialogComponent,
    AddAppointmentDialogComponent,
    LinkProductDialogComponent,
    BusinessBasicInfoComponent,
    LabComponent,
    HospitalsInfoComponent,
    SearchHospitalComponent,
    NewTestDialogComponent,
    NotFoundComponent,
    TestRequestsComponent,
    ProductStockComponent,
    StockUpdateDialogComponent,
    TestStatusUpdateDialogComponent,
    HaDoctorsInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
    FontAwesomeModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    authInterceptorProviders,
    DisplayResponseMessages,
    FilterOptions,
    ConverterUtil
  ],
  bootstrap: [AppComponent],
})
export class AppModule { 
  constructor(){
    library.add(fas)
    library.add(faHouseMedical)
  }
}