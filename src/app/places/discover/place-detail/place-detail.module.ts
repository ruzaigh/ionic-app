import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';
import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule
  ],
  declarations: [PlaceDetailPage, CreateBookingComponent],
  entryComponents: [CreateBookingComponent]
})
export class PlaceDetailPageModule {}
