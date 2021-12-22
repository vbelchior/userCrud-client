import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AddressService } from './address.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [AddressService],
})
export class AddressModule {}
