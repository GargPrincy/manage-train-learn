import { Component,NgZone } from '@angular/core';

import { SlideListingsService } from 'src/services/slide-listings/slide-listings.service';
import {Router, ActivatedRoute, NavigationEnd,Event, NavigationStart, NavigationError} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl} from '@angular/forms';



@Component({
  selector: 'app-slide-all',
  templateUrl: './slide-all.component.html',
  styleUrls: ['./slide-all.component.css']
})
export class SlideAllComponent {
  form = new FormGroup({

    website: new FormControl('')

  });
  public loading:boolean = true;
  
  public showMore:any;
  public numberElements = 6;
  public numberViewed = 6;
  public currentPosition = 1;
  public categoriesAllData:any = [];
  public searchWord: any = '';
  public imageObject:any;
  public showData = 0;
  public scrollSuccessfull = false; 
  public showKeyword:string = "";

  constructor(    
    private _slideListingService: SlideListingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone:NgZone,
    private readonly http: HttpClient,
    private titleService: Title
    ) {
    
     // this.loading =true;
     
      //this.apiData;
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {  }


        if (event instanceof NavigationEnd) {
          this.loading =true;
            // Hide loading indicator
          
            this.scrollSuccessfull = false;
     
        // Show loading indicator
      
          const userId:any = this.activatedRoute.snapshot.paramMap.get('slideSearchKey')?.toString();
          console.log("ayayayysaydyfs",userId);
          const searchKey =userId;
          this.searchWord = searchKey;
    // if (this.searchWord == 'top20s') {  
    //   this.showKeyword =  "Today's Top 20 Videos";
    //   this.categoriesAllData.data = [];
    //   this.getTopSlide();
     


    // } else if(this.searchWord != ""){
    //   this.categoriesAllData.data = [];
    //   this.getAllSlideListing(this.searchWord);
    //   this.showKeyword =  `Search Result's of  "${this.searchWord}"`;
    // }  
 
        }

        if (event instanceof NavigationError) {
            // Hide loading indicator

            // Present error to user
            console.log(event.error);
            console.log("aya3");
        }
    });


    
    this.activatedRoute.queryParams.subscribe(params => { 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('slideSearchKey')?.toString();
  
     
      const myArray = userId.split("?");
      //console.log(myArray,"myArray");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        this.categoriesAllData.data = [];
        this.titleService.setTitle("Today's Top 20 Slides");

      } else if(this.searchWord != ""){
        this.categoriesAllData.data = [];      
        if(myArray[1] == "topic"){
  
          this.showKeyword  = this.searchWord;
          this.titleService.setTitle(this.showKeyword);


        }
        else{
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);

        }     
        

      } 
    });

  
      this.imageObject = [];
    
    
  
      setTimeout(()=>{    
        this.loading = false;
      },1400);
    }

    ngAfterViewInit() {
      
      setTimeout(()=>{    
        this.loading = false;
      },1600);
     
      //We loading the player script on after view is loaded
    }
    ngAfterViewChecked() {
      if (!this.scrollSuccessfull) {
      
      setTimeout(()=>{    
        this.loading = false;
      },1600);

    }
     
      //We loading the player script on after view is loaded
    }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => { 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('slideSearchKey')?.toString();
  
     
      const myArray = userId.split("?");
      console.log(myArray,"myArray");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        this.showKeyword =  "Today's Top 20 Slides";

        this.categoriesAllData.data = [];
        this.getTopSlide();
    
      } else if(this.searchWord != ""){
        this.categoriesAllData.data = [];
        this.getAllSlideListing(this.searchWord);
        if(myArray[1] == "topic"){
          this.showKeyword =  this.searchWord;
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
           this.categoriesAllData.data = response.data;
           this.showData = 1;
         //  this.subContent = response.info?.content
          // this.users = response.body?.data?.data ?? [];
    
         //}
       }
     );
   }
   private getAllSlideListing(searchKeyword:string) {
    this.categoriesAllData.data = [];
    this._slideListingService.getSlideRecordsViewAll(searchKeyword).subscribe(
      response => {
        //this.categoriesAllData.data = [];

    // if (response.body?.isSuccess) {
      //this.zone.run(() => { // <== added
      this.showMore =true;
        console.log("203111",response)
        this.categoriesAllData.data = [...this.categoriesAllData.data ,...response.data];
        //this.categoriesAllData.data.push(response.data);
        this.categoriesAllData.allData = response;
        console.log("205111",this.categoriesAllData.data )
        this.showData = 1;
     // });
     if(response.total.current_page == response.total.last_page){
      this.showMore =false;
     }
   }
      ,
      error => {
        this.categoriesAllData.data = [];
        console.log("226",this.categoriesAllData )
        this.showData = 0; 
           },
    );
  }
  showMoreItems(){
    console.log(186,this.categoriesAllData.allData);
    this._slideListingService.getSlideRecordsViewAllPagination(this.categoriesAllData.allData.total.next_page_url).subscribe(
      response => {     
              console.log("203",response)
              this.categoriesAllData.data = [...this.categoriesAllData.data ,...response.data];
              //this.categoriesAllData.data.push(response.data);
              this.categoriesAllData.allData = response;
              console.log("205",this.categoriesAllData.data )
              this.showData = 1;
           // });
           if(response.total.current_page == response.total.last_page){
            this.showMore =false;
           }
      }
      ,
      error => {
        this.categoriesAllData.data = [];
        console.log("226",this.categoriesAllData )
        this.showData = 0; 
        this.showMore =false;
           },
    );
  }

  private getTopSlide() {
   
    this._slideListingService.getTopSlideRecordAll().subscribe(
      response => {
            //this.categoriesAllData.data = [];

        // if (response.body?.isSuccess) {
          //this.zone.run(() => { // <== added
   
            console.log("2031",response)
            this.categoriesAllData.data = [...this.categoriesAllData.data ,...response.data];
            //this.categoriesAllData.data.push(response.data);
            this.categoriesAllData.allData = response;
            console.log("2051",this.categoriesAllData.allData )
            this.showData = 1;
            this.showMore =true;
         // });
         if(response.total.current_page == response.total.last_page){
          this.showMore =false;
         }
    }
    );
  }

  get f(){

    return this.form.controls;
  
  }

  SlideSort(){  
    console.log("i am in");
    this.showData = 1;
    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
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

  
  onChanges(e:any) {
    if(e.target.value == "viewss"){
      this.SlideSort();
    }else     if(e.target.value  == "atoz"){
      this.SlideSortAlpha();
    }

    console.log(e.target.value);


}

      
  


}
