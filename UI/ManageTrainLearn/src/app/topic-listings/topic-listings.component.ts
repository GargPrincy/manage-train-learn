import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event, NavigationStart, NavigationError } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Title } from '@angular/platform-browser';

import { FormGroup, FormControl } from '@angular/forms';
import { SlideListingsService } from 'src/services/slide-listings/slide-listings.service';
import { CategoriesService } from 'src/services/categories/categories.service';


export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-topic-listings',
  templateUrl: './topic-listings.component.html',
  styleUrls: ['./topic-listings.component.css']
})
export class TopicListingComponent {
  form = new FormGroup({

    website: new FormControl('')

  });

  apiData: any;
  totalCount: number = 0;
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    autoplay: false,
    rewind: false /* use rewind if you don't want loop */,
    margin: 20,
    items: 5,
    slideBy: 4,
    dots: false, autoWidth: false, autoHeight: false, slideTransition: 'linear',
    navText: ["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>", "<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
    animateOut: 'fadeOut', animateIn: 'fadeIn',
    navSpeed: 100,
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
    stagePadding: 1
  };
  public loading: boolean = true;
  public categoriesAllData: any = [];
  public searchWord: any = '';
  public showData = 0;
  public scrollSuccessfull = false;
  public showKeyword: string = "";  
  public searchtopic: string = ""; 
  public urlHolderQueryParams: string = "";
  public topicKeyword: boolean = false;
  public tpcId:any;
  public catId:any;


  constructor(
    private _slideListingService: SlideListingsService,
    private _categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private readonly http: HttpClient,
    private titleService: Title
  ) {


    this.topicKeyword = false;
    console.log("listing component");
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { }
      if (event instanceof NavigationEnd) {
        this.loading = true;
        this.topicKeyword = false;

        this.scrollSuccessfull = false;
        // Show loading indicator

        const userId: any = this.activatedRoute.snapshot.paramMap.get('categoryId')?.toString();
        const topicId: any = this.activatedRoute.snapshot.paramMap.get('topicId')?.toString();
        console.log("ayayayysaydyfs", userId);
        console.log("ayayayys-topic-id", topicId);
      //   const searchKey = userId;
      //   this.searchWord = searchKey;
      // this.searchtopic = topicId;
      this.categoriesAllData = [];

        this.getData(userId, topicId);

      }

      if (event instanceof NavigationError) { }
    });


    // this.activatedRoute.queryParams.subscribe(params => {
    //   const userId: any = this.activatedRoute.snapshot.paramMap.get('categoryId')?.toString();
    //   const topicId: any = this.activatedRoute.snapshot.paramMap.get('topicId')?.toString();

    //   console.log(userId, "userId-princy");
    //   console.log(topicId, "topicId-princy");
    //   // const searchKey = userId;
    //   // this.searchWord = searchKey;
    //   // this.searchtopic = topicId;
    //   this.categoriesAllData.data = [];
    //   this.getData(userId, topicId);

     
    // });

    setTimeout(() => {
      this.loading = false;
    }, 600);
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.loading = false;
    }, 600);

    //We loading the player script on after view is loaded
  }
  ngAfterViewChecked() {
    if (!this.scrollSuccessfull) {

      setTimeout(() => {
        this.loading = false;
      }, 600);

    }

    //We loading the player script on after view is loaded
  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const userId: any = this.activatedRoute.snapshot.paramMap.get('categoryId')?.toString();
      const topicId: any = this.activatedRoute.snapshot.paramMap.get('topicId')?.toString();
      console.log(userId, "userId-princy");
      console.log(topicId, "topicId-princy");
      const searchKey = userId;
      // this.searchWord = searchKey;
      // this.searchtopic = topicId;
      this.categoriesAllData.data = [];
      this.getData(userId, topicId);
      // this.categoryviewAll(this.searchWord);

     
    });


  }


  //  private getData() {
  //    this._slideListingService.getCategoryRecords().subscribe(
  //      response => {
  //        console.log("get data",response)
  //       // if (response.body?.isSuccess) {
  //          this.categoriesAllData.data = response;
  //          this.showData = 1;
  //        //  this.subContent = response.info?.content
  //         // this.users = response.body?.data?.data ?? [];

  //        //}
  //      }
  //    );
  //  }

  private getData(slideIds: number, topci:number) {
    console.log(slideIds, 'slide-id-princy')
    console.log(topci, 'topci-id-princy')
    this.tpcId = topci;
    this.catId = slideIds;
    this.categoriesAllData.data = [];
    this._categoryService.getCategoryTopic(this.catId, this.tpcId).subscribe(
      response => {
        console.log("priny-topic-response", response);

        // if (response) {
          this.categoriesAllData = response;
          this.categoriesAllData.data = this.categoriesAllData.data;

          // this.showKeyword = 
        console.log("priny-topic", this.categoriesAllData.data);
        this.showData = 1;
        let arr = this.categoriesAllData.topicDetails;

        //   this.noData = arr.every((value:any)=> { 
        //     return (value.total_slides < 1); 
        // });

      },
      error => {
        this.categoriesAllData.data = [];
        console.log("187", this.categoriesAllData.data)
        this.showData = 0;
      },
      );

  }
  private getAllSlideListing(searchKeyword: string) {
    this.categoriesAllData.data = [];
    this._slideListingService.getSlideRecords(searchKeyword).subscribe(
      response => {

        // if (response.body?.isSuccess) {
        //this.zone.run(() => { // <== added

        console.log("203", response)
        let a = response;
        let b = a?.data;
        this.categoriesAllData.data = response.data;
        this.totalCount = response.total.total;
        console.log("1811111111111111", this.categoriesAllData.data)

        this.showData = 1;
        // });
      }
      ,
      error => {
        this.categoriesAllData.data = [];
        console.log("187", this.categoriesAllData.data)
        this.showData = 0;
      },
    );
  }


  // private categoryviewAll(id: any) {
  //   console.log(id, 'id-view-topic')
  //   this.categoriesAllData.data = [];
  //   this._categoryService.getCategoryView(id).subscribe(response => {
  //     console.log(response, 'response-category-view-topic')
  //     this.categoriesAllData = response;
  //     // this.categoriesAllData.allData = this.categoriesAllData;
  //     console.log(this.categoriesAllData.data, '<<<<-view-topic')
  //     this.showKeyword = this.categoriesAllData.data[0].topic;
  //     this.totalCount = this.categoriesAllData.total.total;
  //     this.showData = 1;

  //     // if(this.categoriesAllData.total.current_page != this.categoriesAllData.total.last_page){
  //     //   this.showMore =true;
  //     //  }

  //     //  if(this.categoriesAllData.total.current_page == this.categoriesAllData.total.last_page){
  //     //     this.showMore =false;
  //     //    }
  //   },
  //     error => {
  //       this.categoriesAllData.data = [];
  //       console.log("187", this.categoriesAllData.data)
  //       this.showData = 0;
  //     },)
  // }


  slideAll() {
    console.log('fffffffffffffff')
    this.router.navigate(['/slide-all', this.urlHolderQueryParams]);
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
  onChanges(e: any) {
    if (e.target.value == "viewss") {
      this.SlideSort();
    } else if (e.target.value == "atoz") {
      this.SlideSortAlpha();
    }

    console.log(e.target.value);


  }
  get f() {

    return this.form.controls;

  }

  SlideSort() {
    console.log("i am in");
    this.showData = 1;
    console.log(this.categoriesAllData.data, 'sort-data')

    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
    console.log('vidtaaa-listing', vidData)

    this.categoriesAllData.data = [];

    this.categoriesAllData.data = vidData.sort(function (a: any, b: any) {
      return b.download_count - a.download_count;
    });


    setTimeout(() => {
      this.loading = false;
    }, 100);


  }
  SlideSortAlpha() {
    console.log("i am in");
    this.showData = 1;
    console.log(this.categoriesAllData.data, 'sort-data-1')
    let vidData1 = JSON.parse(JSON.stringify(this.categoriesAllData.data));
    console.log('vidtaaa-listing-1', vidData1)
    this.categoriesAllData.data = [];

    this.categoriesAllData.data = vidData1.sort(function (a: any, b: any) {
      var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0; //default return value (no sorting)
    });

    setTimeout(() => {
      this.loading = false;
    }, 100);


  }



}

