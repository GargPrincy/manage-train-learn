import { Component } from '@angular/core';
import { CategoriesService } from 'src/services/categories/categories.service';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import * as jQuery from 'jquery';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  public categoriesAllData:any = [];
  public totalSlide = 0;
  constructor(    
    private _categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
    ) {
      this.titleService.setTitle("Categories");
    }

  ngOnInit() {
    this.titleService.setTitle("Categories");
    this.getData();  
  }


   private getData() {
    this._categoryService.getCategoryRecords().subscribe(
      response => {
          console.log("get data",response)
         // if (response) {
          this.categoriesAllData = response;
          console.log( this.categoriesAllData, 'cate-response')
          this.totalSlide = this.categoriesAllData.totalSlides;
          console.log(this.totalSlide, 'total-topic')
        //  this.subContent = response.info?.content
         // this.users = response.body?.data?.data ?? [];
   
        //}
      }
    );
  }
  showTopic(id:number){
    console.log(id,"ddddd");
   // jQuery("#"+id).attr("style", "display:block");
    $("#"+id).toggle("slow")

  }
}
