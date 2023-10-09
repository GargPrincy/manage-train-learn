import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicListingComponent } from './topic-listings.component';

const routes: Routes = [
  {
    path: 'topic-listings/:categoryId/:topicId',
    component: TopicListingComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicListingsRoutingModule { }
