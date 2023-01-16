import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlidesRoutingModule } from './slides-routing.module';

// import {YouTubePlayerModule} from '@angular/youtube-player';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SlideComponent } from './slides.component';
// import { NgImageSliderModule } from 'ng-image-video-gallery';

@NgModule({
  declarations: [SlideComponent],
  imports: [
    CommonModule,
    // YouTubePlayerModule,
    PdfViewerModule,
    SlidesRoutingModule,
    // NgImageSliderModule
 
  ]
})
export class SlidesModule { }
