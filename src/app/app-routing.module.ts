import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { ApplicationFilesComponent } from './application-files/application-files.component';
import { ApplicationPersonalComponent } from './application-personal/application-personal.component';
import { ApplicationVehicleComponent } from './application-vehicle/application-vehicle.component';
import { EligibilityApplicationComponent } from './eligibility-application/eligibility-application.component';
import { EmiCalcComponent } from './emi-calc/emi-calc.component';
import { HomeComponent } from './home/home.component';
import { LoanOffersComponent } from './loan-offers/loan-offers.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { AboutUsComponent } from './about-us/about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Emicalc', component: EmiCalcComponent},
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegistrationComponent },
  { path: 'UserDashboard', component: UserDashComponent },
  { path: 'AdminDashboard', component: AdminDashComponent },
  { path: 'ApplyLoan', component: ApplicationPersonalComponent},
  { path: 'LoanOffers/:eligId', component: LoanOffersComponent},
  { path: 'ApplyLoanVehicle', component: ApplicationVehicleComponent},
  { path: 'UploadFiles', component: ApplicationFilesComponent},
  { path: 'EligibilityApplication', component: EligibilityApplicationComponent},
  { path: 'Aboutus' , component: AboutUsComponent},
  { path: 'ContactUs', component: ContactUsComponent},
  { path: 'Terms&Conditions', component: TermsComponent},
  { path: 'Privacy', component: PrivacyComponent},
  { path: 'Settings', component: UpdateProfileComponent},
  { path: 'Clients', component: ClientsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
