import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SlideListingsRoutingModule } from './slide-listings-routing.module';
import { SlideListingsComponent } from './slide-listings.component';




@NgModule({
  declarations: [SlideListingsComponent],
  imports: [
    CommonModule,
    SlideListingsRoutingModule,
    ReactiveFormsModule,
    CarouselModule
  ]
})
export class SlideListingsModule { }
