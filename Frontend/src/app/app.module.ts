import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <---

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoDoctorComponent } from './components/info-doctor/info-doctor.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoDoctorComponent,
    FormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule // <----

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
