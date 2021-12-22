import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { InterceptorModule } from '@commons/interceptors/interceptor.module';

import { environment } from '@commons/environments';
import { AppComponent } from './app.component';
import { AccountModule } from '../app/account/account.module';
import { AddressModule } from '@commons/entities/address';
import { HomeModule } from '../app/home/home.module';
import { VehicleModule } from '../app/vehicles/vehicle.module';
import { UserModule } from '../app/users/user.module';

registerLocaleData(localePt); // FIXME: set this dynamically

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatSidenavModule,
    MatNativeDateModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AccountModule,
    AddressModule,
    HomeModule,
    VehicleModule,
    UserModule,
    InterceptorModule.forRoot({ serverUrl: environment.server }),
    RouterModule.forRoot(routes),
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
