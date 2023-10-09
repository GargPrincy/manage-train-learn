import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { TopicListingsRoutingModule } from './topic-listings-routing.module';
import { TopicListingComponent } from './topic-listings.component';




@NgModule({
  declarations: [TopicListingComponent],
  imports: [
    CommonModule,
    TopicListingsRoutingModule,
    ReactiveFormsModule,
    CarouselModule
  ]
})
export class TopicListingsModule { }
