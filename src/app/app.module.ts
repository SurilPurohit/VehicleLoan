import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { EligibilityVehicleComponent } from './eligibility-vehicle/eligibility-vehicle.component';
import { EligibilityApplicationComponent } from './eligibility-application/eligibility-application.component';
import { ApplicationPersonalComponent } from './application-personal/application-personal.component';
import { ApplicationVehicleComponent } from './application-vehicle/application-vehicle.component';
import { ApplicationFilesComponent } from './application-files/application-files.component';
import { EmiCalcComponent } from './emi-calc/emi-calc.component';
import { HomeComponent } from './home/home.component';
import { LoanOffersComponent } from './loan-offers/loan-offers.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './about-us/about-us/about-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    EligibilityVehicleComponent,
    EligibilityApplicationComponent,
    ApplicationPersonalComponent,
    ApplicationVehicleComponent,
    ApplicationFilesComponent,
    EmiCalcComponent,
    HomeComponent,
    LoanOffersComponent,
    UserDashComponent,
    AdminDashComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
