
import { Component } from '@angular/core';
import { CategoriesService } from 'src/services/categories/categories.service';
import {Router, ActivatedRoute, NavigationEnd,Event} from '@angular/router';
import * as jQuery from 'jquery';
import { Title } from '@angular/platform-browser';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-category-listings',
  templateUrl: './category-listings.component.html',
  styleUrls: ['./category-listings.component.css']
})
export class CategoryListingsComponent {
  form = new FormGroup({

    website: new FormControl('')

  });
  public showContent:boolean=false;
  public showCurrentTopic:string = "";
  public categoriesAllDataCategoryListing:any = [];
    customOptions: OwlOptions = {
    autoplay: false,
    rewind: false /* use rewind if you don't want loop */,
    margin: 20,    items:5,    slideBy:4,     dots:false,    autoWidth:false,    autoHeight:false,       slideTransition:'linear',
    navText:["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>","<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
    animateOut: 'fadeOut', animateIn: 'fadeIn', navSpeed:100,
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true,
    stagePadding:1
  };
  public totalTopic = 0;
  constructor(    
    private _categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    ) {
      this.titleService.setTitle("Categories");
      this.categoriesAllDataCategoryListing = [];
      

      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
        
      
          const cateId:any = this.activatedRoute.snapshot.paramMap.get('categoryId')?.toString();
          this.getData(cateId);
        }

    });

    }

  ngOnInit() {
    this.titleService.setTitle("Categories");
    this.categoriesAllDataCategoryListing = [];
    this.activatedRoute.queryParams.subscribe(params => {
      const videoId = params['categoryId'];
      const id = this.activatedRoute.snapshot.paramMap.get('categoryId');
      const userId:any = this.activatedRoute.snapshot.paramMap.get('categoryId')?.toString();


      console.log("....................",params,userId,id);
      let cateIds:number = parseInt(userId)
      this.getData(cateIds); 
     
      
      
    });
  }


   private getData(slideIds:number) {
    this._categoryService.getCategoryDetails(slideIds).subscribe(
      response => {
        
         // if (response) {
          this.categoriesAllDataCategoryListing = response[0];
         console.log("get datavallllllllll",this.categoriesAllDataCategoryListing );
          this.showContent = true;
         
          setTimeout(() => {
            this.showTopic(0);  
          }, 500);
      });
    
  }
  showTopic(id:number){
    console.log(id,"ddddd");
   // jQuery("#"+id).attr("style", "display:block");
 //  $("#"+id).attr("style", "visibility:visible");

 //  $("#"+id).click(function(){
  
  $(".mainAll").css('display','none');
    if ( $("#"+id).css('display') == 'none' )
      $("#"+id).css('display','block');
    else
      $("#"+id).css('display','none');
//  });


this.showCurrentTopic = this.categoriesAllDataCategoryListing.topicDetails[id].topic_name;


   setTimeout(() => {
   // $("#"+id).toggle("slow")
   }, 2000);
 

  }
  onChanges(e:any,ind:any) {
    if(e.target.value == "viewss"){
      this.SlideSort(ind);
    }else     if(e.target.value  == "atoz"){
      this.SlideSortAlpha(ind);
    }

    console.log(e.target.value);


}
get f(){

return this.form.controls;

}
SlideSort(indexed:any){  
  console.log("i am in");

  let vidData = JSON.parse(JSON.stringify(this.categoriesAllDataCategoryListing.topicDetails[indexed].slides));
  console.log('vidtaaa', vidData)
  this.categoriesAllDataCategoryListing.topicDetails[indexed].slides= [];

  this.categoriesAllDataCategoryListing.topicDetails[indexed].slides= vidData.sort(function (a:any, b:any) {
    return b.download_count - a.download_count;
  });




}
SlideSortAlpha(indexed:any){  

  let vidData = JSON.parse(JSON.stringify(this.categoriesAllDataCategoryListing.topicDetails[indexed].slides));
  this.categoriesAllDataCategoryListing.topicDetails[indexed].slides= [];

  this.categoriesAllDataCategoryListing.topicDetails[indexed].slides = vidData.sort(function(a:any, b:any){
    var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
    if (nameA < nameB) //sort string ascending
     return -1;
    if (nameA > nameB)
     return 1;
    return 0; //default return value (no sorting)
   });

  

}

}
