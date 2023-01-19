import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListingsComponent } from './category-listings.component';

const routes: Routes = [
  {
    path: 'category-listing/:categoryId',
    component: CategoryListingsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryListingsRoutingModule { }
