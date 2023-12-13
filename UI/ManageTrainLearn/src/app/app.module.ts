import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SearchComponent } from './search/search.component';
import { CategoryComponent } from './category/category.component'; 
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';

import { SlideAllComponent } from './slide-all/slide-all.component';
import { SlideListingsComponent } from './slide-listings/slide-listings.component';
import { SlidesModule } from './slides/slides.module';
import { CategoryListingsComponent } from './category-listings/category-listings.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { TopicListingComponent } from './topic-listings/topic-listings.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SearchComponent,
    PagenotfoundComponent,
    SocialLoginComponent,
    SlideAllComponent,
    SlideListingsComponent,
    CategoryListingsComponent,
    CategoryViewComponent,
    TopicListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    // SocialLoginModule,
    CarouselModule,
    CommonModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    SlidesModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
          //  provider: new GoogleLoginProvider('308041842089-utsn90t5mu6s442r7j7htpvbdbll5t18.apps.googleusercontent.com')
          //  provider: new GoogleLoginProvider('192654719663-97kq740ii1lcbl0buqiv8e51624c28tp.apps.googleusercontent.com')  demo server
           provider: new GoogleLoginProvider('494132189522-i6f6l1s9vrkjffu9cfoo3f9k6pn01uio.apps.googleusercontent.com')  //live server
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            // provider: new FacebookLoginProvider('739091271259555')  demo server
            provider: new FacebookLoginProvider('739091271259555')  //live server
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
