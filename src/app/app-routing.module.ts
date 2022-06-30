import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './auth/admin.guard';
import { DoctorGuard } from './auth/doctor.guard';
import { HospitalAdminGuard } from './auth/hospital-admin.guard';
import { PatientGuard } from './auth/patient.guard';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { HospitalAdminDashboardComponent } from './hospital-admin/hospital-admin-dashboard/hospital-admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { ProfileComponent } from './patient/profile/profile.component';
import { AppointmentsComponent } from './patient/appointments/appointments.component';
import { TestsComponent } from './patient/tests/tests.component';
import { IndexComponent } from './common/index/index.component';
import { HomeComponent } from './patient/home/home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { PatientComponent } from './admin/patient/patient.component';
import { HospitalComponent } from './admin/hospital/hospital.component';
import { HospitalAdminComponent } from './admin/hospital-admin/hospital-admin.component';
import { FindDoctorsComponent } from './angular-cmp/find-doctors/find-doctors.component';
import { FindProductsComponent } from './angular-cmp/find-products/find-products.component';
import { HospitalAdminHomeComponent } from './hospital-admin/hospital-admin-home/hospital-admin-home.component';
import { FindHospitalsComponent } from './angular-cmp/find-hospitals/find-hospitals.component';
import { HospitalAdminAppointmentsComponent } from './hospital-admin/hospital-admin-appointments/hospital-admin-appointments.component';
import { HospitalAdminProfileComponent } from './hospital-admin/hospital-admin-profile/hospital-admin-profile.component';
import { DoctorsInfoComponent } from './angular-cmp/doctors-info/doctors-info.component';
import { PatientInfoComponent } from './angular-cmp/patient-info/patient-info.component';
import { HospitalsInfoComponent } from './angular-cmp/hospitals-info/hospitals-info.component';
import { LabInfoComponent } from './angular-cmp/lab-info/lab-info.component';
import { ProductsInfoComponent } from './angular-cmp/products-info/products-info.component';
import { HospitalAdminsInfoComponent } from './angular-cmp/hospital-admins-info/hospital-admins-info.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { CancelAppointmentComponent } from './patient/cancel-appointment/cancel-appointment.component';
import { RescheduleAppointmentComponent } from './patient/reschedule-appointment/reschedule-appointment.component';
import { BookProductComponent } from './patient/book-product/book-product.component';
import { PurchasedProductsComponent } from './patient/purchased-products/purchased-products.component';
import { ForgotPswComponent } from './pages/forgot-psw/forgot-psw.component';
import { HospitalProfileComponent } from './profiles/hospital-profile/hospital-profile.component';
import { NewTestDialogComponent } from './dialogs/new-test-dialog/new-test-dialog.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { TestRequestsComponent } from './hospital-admin/test-requests/test-requests.component';
import { ProductStockComponent } from './hospital-admin/product-stock/product-stock.component';
import { HaDoctorsInfoComponent } from './hospital-admin/ha-doctors-info/ha-doctors-info.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent, 
    pathMatch: 'full'
  },
  {
    path: 'hospital-profile',
    component: HospitalProfileComponent, 
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'forgotPsw',
    component: ForgotPswComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup', 
    component: SignupComponent, 
    pathMatch: 'full'
  },

  {
    path: 'patient', 
    component: PatientDashboardComponent, 
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {title: 'Home'},
      },
      {
        path: 'profile', 
        component: ProfileComponent,
      },
      {
        path: 'appointments', 
        component: AppointmentsComponent,
        data: {title: 'Appointments'},
      },
      {
        path: 'book-appointment', 
        component: BookAppointmentComponent
      },
      {
        path: 'cancel-appointment', 
        component: CancelAppointmentComponent
      },
      {
        path: 'reschedule-appointment', 
        component: RescheduleAppointmentComponent
      },
      {
        path: 'tests', 
        component: TestsComponent,
      },
      {
        path: 'product-book', 
        component: BookProductComponent
      },
      {
        path: 'purchased-products',
        component: PurchasedProductsComponent,
      },
    ]
  },
  {
    path: 'hospital-admin', 
    component: HospitalAdminDashboardComponent,
    children: [
      {
        path: '',
        component: HospitalAdminHomeComponent
      },
      {
        path: 'doctors',
        component: HaDoctorsInfoComponent,
        data: {title: 'Doctor'},
      },
      {
        path: 'appointments',
        component : HospitalAdminAppointmentsComponent,
        data: {title: 'Appointment'},
      },
      {
        path: 'profile',
        component: HospitalAdminProfileComponent,
        data: {title: 'Profile'},
      },
      {
        path: 'tests',
        component: TestRequestsComponent
      },
      {
        path: 'products',
        component: ProductStockComponent
      },
    ]
  },
  {
    path: 'doctor', 
    component: DoctorDashboardComponent, 
    pathMatch: 'full',
    canActivate: [DoctorGuard]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children:[
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'patients',
        component: PatientInfoComponent,
      },
      {
        path: 'doctors',
        component: DoctorsInfoComponent,
      },
      {
        path: 'hospitals',
        component: HospitalsInfoComponent,
      },
      {
        path: 'hospital-admins',
        component: HospitalAdminsInfoComponent,
      },
      {
        path: 'products',
        component: ProductsInfoComponent,
      },
      {
        path: 'labs',
        component: LabInfoComponent,
      },
      
    ],
    
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
