import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import { EditOfferPageRoutingModule } from './edit-offer-routing.module';

import { EditOfferPage } from './edit-offer.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditOfferPageRoutingModule
  ],
  declarations: [EditOfferPage]
})
export class EditOfferPageModule {}
