import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlidesRoutingModule } from './slides-routing.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SlideComponent } from './slides.component';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SocialLoginModule } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [SlideComponent],
  imports: [
    CommonModule,
    NgbTooltipModule,
    PdfViewerModule,
    SlidesRoutingModule,
    CarouselModule,
    SocialLoginModule
  ]
})
export class SlidesModule { }
