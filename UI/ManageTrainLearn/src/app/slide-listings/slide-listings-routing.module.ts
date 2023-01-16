import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlideListingsComponent } from './slide-listings.component';

const routes: Routes = [
  {
    path: 'slide-listings/:slideSearchKey',
    component: SlideListingsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlideListingsRoutingModule { }
