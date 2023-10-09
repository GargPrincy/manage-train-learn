import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { SlideListingsComponent } from './slide-listings/slide-listings.component';
import { SearchComponent } from './search/search.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { SlideAllComponent } from './slide-all/slide-all.component';
import { SlideComponent } from './slides/slides.component';
import { CategoryListingsComponent } from './category-listings/category-listings.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { TopicListingComponent } from './topic-listings/topic-listings.component';


const routes: Routes = [
  {
    path: "",
    loadChildren:() => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: 'categories', component: CategoryComponent },
  { path: 'category-listing/:categoryId', component: CategoryListingsComponent },
  {
    path: "category-view/:topicId", component: CategoryViewComponent 
  },
  {
    path: "category-view", component: CategoryViewComponent 
  },
  {
    path: "topic-listings/:categoryId/:topicId",
    component: TopicListingComponent 
  },
  
  {
    path: "slide-listings/:slideSearchKey",
    component: SlideListingsComponent 
  },
  {
    path: "slide-listings",
    component: SlideListingsComponent 
  },
  {
    path: "slide-all/:slideSearchKey",
    component: SlideAllComponent 
  },
  {
    path: "slide-all",
    component: SlideAllComponent 
  },
  {
    path: "slide/:slideParamId",component: SlideComponent 
  },
  // { path: 'login', component: SocialLoginComponent },
  { path: '**', pathMatch: 'full',component: PagenotfoundComponent },
  { path: 'search', component: SearchComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
