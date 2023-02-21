import { Component,NgZone } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd,Event, NavigationStart, NavigationError} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Title } from '@angular/platform-browser';

import { FormGroup, FormControl } from '@angular/forms';
import { SlideListingsService } from 'src/services/slide-listings/slide-listings.service';


export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-slide-listings',
  templateUrl: './slide-listings.component.html',
  styleUrls: ['./slide-listings.component.css']
})
export class SlideListingsComponent {
  form = new FormGroup({

    website: new FormControl('')

  });

  apiData: any;
  totalCount:number = 0;
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    autoplay: false,
    rewind: false /* use rewind if you don't want loop */,
    margin: 20,    
    items:5, 
    slideBy:4,      
    dots:false,    autoWidth:false,    autoHeight:false,       slideTransition:'linear',
    navText:["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>","<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
    animateOut: 'fadeOut', animateIn: 'fadeIn',
    navSpeed:100,
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
  public loading:boolean = true;
  public categoriesAllData:any = [];
  public searchWord: any = '';  
  public showData = 0;
  public scrollSuccessfull = false; 
  public showKeyword:string = "";
  public urlHolderQueryParams:string="";
  public topicKeyword:boolean=false;


  constructor(    
    private _slideListingService: SlideListingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone:NgZone,
    private readonly http: HttpClient,
    private titleService: Title
    ) {
  
     
      this.topicKeyword = false;
      console.log("listing component");
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {  }
        if (event instanceof NavigationEnd) {
          this.loading =true;
          this.topicKeyword = false;

          this.scrollSuccessfull = false;    
        // Show loading indicator
      
          const userId:any = this.activatedRoute.snapshot.paramMap.get('slideSearchKey')?.toString();
          console.log("ayayayysaydyfs",userId);
          const searchKey =userId;
          this.searchWord = searchKey;
          if (this.searchWord == 'top20s') {  
            this.totalCount = 20;
            this.showKeyword =  "Today's Top 20 Slides";
            this.categoriesAllData = [];
            this.titleService.setTitle("Today's Top 20 Slides");
            this.getTopSlide();
          } else if(this.searchWord != ""){
            this.categoriesAllData= [];
            this.getAllSlideListing(this.searchWord);
            this.showKeyword =  `Search Results of  "${this.searchWord}"`;
            this.titleService.setTitle(this.showKeyword);

          }  
          this.urlHolderQueryParams = this.searchWord; 
        }

        if (event instanceof NavigationError) { }
    });


    this.activatedRoute.queryParams.subscribe(params => { 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('slideSearchKey')?.toString();
  
     
      const myArray = userId.split("?");
      //console.log(myArray,"myArray");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        //this.categoriesAllData.data = [];
      } else if(this.searchWord != ""){
       // this.categoriesAllData.data = [];      
        if(myArray[1] == "topic"){
          this.urlHolderQueryParams = this.searchWord+"?topic";
          this.showKeyword  = this.searchWord;
          this.topicKeyword = true;
          this.titleService.setTitle(this.showKeyword);
        }
        else{
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);
        }     

      } 
    });

      setTimeout(()=>{    
        this.loading = false;
      },600);
    }

    ngAfterViewInit() {
      
      setTimeout(()=>{    
        this.loading = false;
      },600);
     
      //We loading the player script on after view is loaded
    }
    ngAfterViewChecked() {
      if (!this.scrollSuccessfull) {
      
      setTimeout(()=>{    
        this.loading = false;
      },600);

    }
     
      //We loading the player script on after view is loaded
    }


  ngOnInit() {
       this.activatedRoute.queryParams.subscribe(params => { 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('slideSearchKey')?.toString();
  
     
      const myArray = userId.split("?");
      //console.log(myArray,"myArray");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        this.categoriesAllData.data = [];
        this.getTopSlide();
    
      } else if(this.searchWord != ""){
        this.categoriesAllData.data = [];
        this.getAllSlideListing(this.searchWord);
        if(myArray[1] == "topic"){
          this.urlHolderQueryParams = this.searchWord+"?topic";
          this.showKeyword =  this.searchWord;
          this.topicKeyword = true;
          this.titleService.setTitle(this.showKeyword);

        }
        else{
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);

        }     

      } 
    });
   
  
   }

 
   private getData() {
     this._slideListingService.getCategoryRecords().subscribe(
       response => {
         console.log("get data",response)
        // if (response.body?.isSuccess) {
           this.categoriesAllData.data = response;
           this.showData = 1;
         //  this.subContent = response.info?.content
          // this.users = response.body?.data?.data ?? [];
    
         //}
       }
     );
   }
   private getAllSlideListing(searchKeyword:string) {
    this.categoriesAllData.data = [];
    this._slideListingService.getSlideRecords(searchKeyword).subscribe(
      response => {

          // if (response.body?.isSuccess) {
            //this.zone.run(() => { // <== added
     
              console.log("203",response)
              let a = response;
              let b=a?.data;
              this.categoriesAllData.data = response.data;
              this.totalCount = response.total.total;
              console.log("1811111111111111",this.categoriesAllData.data)
              
              this.showData = 1;
           // });
      }
      ,
      error => {
        this.categoriesAllData.data = [];
        console.log("187",this.categoriesAllData.data )
        this.showData = 0; 
           },
    );
  }
  slideAll(){
    console.log('fffffffffffffff')
    this.router.navigate(['/slide-all',this.urlHolderQueryParams]);
  }
  private getTopSlide() {
    console.log('princy garg')
    this.categoriesAllData.data = [];
    this._slideListingService.getTopSlideRecord().subscribe(
      response => {   
            
          this.categoriesAllData.data = response.data;
          this.showData = 1;
      }
    );
  }
  onChanges(e:any) {
      if(e.target.value == "viewss"){
        this.SlideSort();
      }else if(e.target.value  == "atoz"){
        this.SlideSortAlpha();
      }

      console.log(e.target.value);


}
get f(){

  return this.form.controls;

}

  SlideSort(){  
    console.log("i am in");
    this.showData = 1;
    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
  console.log('vidtaaa-listing', vidData)

    this.categoriesAllData.data = [];

    this.categoriesAllData.data = vidData.sort(function (a:any, b:any) {
      return b.download_count - a.download_count;
    });
  
    
    setTimeout(()=>{    
      this.loading = false;
    },100);

  
  }
  SlideSortAlpha(){  
    console.log("i am in");
    this.showData = 1;
    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
    this.categoriesAllData.data = [];

    this.categoriesAllData.data = vidData.sort(function(a:any, b:any){
      var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
      if (nameA < nameB) //sort string ascending
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; //default return value (no sorting)
     });
  
    
    setTimeout(()=>{    
      this.loading = false;
    },100);

  
  }

      
  
}

