import { Component } from '@angular/core';

import { SlideListingsService } from 'src/services/slide-listings/slide-listings.service';
import { CategoriesService } from 'src/services/categories/categories.service';
import { Router, ActivatedRoute, NavigationEnd, Event, NavigationStart, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent {
  form = new FormGroup({

    website: new FormControl('')

  });
  public loading: boolean = true;

  public showMore: any;
  public numberElements = 6;
  public numberViewed = 6;
  public currentPosition = 1;
  public categoriesAllData: any = [];
  public searchWord: any = '';
  public imageObject: any;
  public showData = 0;
  public scrollSuccessfull = false;
  public showKeyword: string = "";
  public categoryTopicDetails: any = [];


  constructor(
    private _slideListingService: SlideListingsService,
    private _categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    // this.categoriesAllData.data = [];
    // window.location.reload()
    // this.loading =true;

    //this.apiData;
    this.router.events.subscribe((event: Event) => {
      // if (event instanceof NavigationStart) {  }

      if (event instanceof NavigationEnd) {
        this.loading = true;
        // Hide loading indicator

        this.scrollSuccessfull = false;

        // Show loading indicator

        const userId: any = this.activatedRoute.snapshot.paramMap.get('topicId')?.toString();
        console.log("princy-user", userId);
        // console.log("ayayayysaydyfs",typeof(userId));

        // const searchKey =userId;
        // this.searchWord = searchKey;
        // this.categoriesAllData.data = [];
        // this.categoryviewAll(userId);
        // this.categoriesAllData.data = [];


      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
        console.log("aya3");
      }
    });



    // this.activatedRoute.queryParams.subscribe(params => { 
    //   const userId:any = this.activatedRoute.snapshot.paramMap.get('topicId')?.toString();
    //   console.log("ayayayysaydyfs-princy",userId);
    //   console.log("ayayayysaydyfs-princy",typeof(userId));
    //   // const searchKey =userId;
    //   //     this.searchWord = searchKey;
    //   // this.categoriesAllData.data = [];
    //   this.categoryviewAll(userId);


    // });


    // this.imageObject = [];



    setTimeout(() => {
      this.loading = false;
    }, 2200);
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.loading = false;
    }, 2200);

    //We loading the player script on after view is loaded
  }
  ngAfterViewChecked() {

    if (!this.scrollSuccessfull) {
      setTimeout(() => {
        this.loading = false;
      }, 2200);

    }

    //We loading the player script on after view is loaded
  }



  ngOnInit() {
    // this.categoriesAllData.data = [];
    // this.loading = true;
    this.activatedRoute.queryParams.subscribe(params => {
      // console.log(params['topicId'], 'params-130') 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('topicId')?.toString();
      // let cateIds:number = parseInt(userId)
      console.log("princy-user-1",userId);
      // console.log("ayayayysaydyfs-princy1",typeof(userId));
      this.categoryviewAll(userId);
      // this.categoriesAllData.data = [];
    });

    setTimeout(()=>{    
      this.loading = false;
    },600);


   }


  private categoryviewAll(id: number) {
    console.log(id, 'id-view-topic')

    // this.loading = true;
    this.categoriesAllData.data = [];
    this._slideListingService.getCategoryView(id).subscribe((response:any) => {
      this.loading = false;
      console.log(response.data, 'response-category-view-topic')
      // this.categoriesAllData = response.data;

      // if(id == this.categoriesAllData.data[0].topic_id){
      //   console.log('hi princy there')
      // }

      this.categoriesAllData.data = [...this.categoriesAllData.data, ...response.data];
      this.categoriesAllData.allData = response;
      console.log(this.categoriesAllData.data, '+++++++++++++++++++++++++++++')

      this.showData = 1;

      if (response.total.current_page != response.total.last_page) {
        this.showMore = true;
      } else if (response.total.current_page == response.total.last_page) {
        this.showMore = false;
      }

      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
      error => {
        this.categoriesAllData.data = [];
        console.log("187", this.categoriesAllData.data)
        this.showData = 0;
      },)

  }


  showMoreItems() {
    console.log(186, this.categoriesAllData.allData);
    this._slideListingService.getSlideRecordsViewAllPagination(this.categoriesAllData.allData.total.next_page_url).subscribe(
      response => {
        console.log("203", response)
        this.categoriesAllData.data = [ ...this.categoriesAllData.data, ...response.data];
        //this.categoriesAllData.data.push(response.data);
        this.categoriesAllData.allData = response;
        console.log("205", this.categoriesAllData.data)
        this.showData = 1;
        // });
        if (response.total.current_page == response.total.last_page) {
          this.showMore = false;
        }
      }
      ,
      error => {
        this.categoriesAllData.data = [];
        console.log("226", this.categoriesAllData)
        this.showData = 0;
        this.showMore = false;
      },
    );
  }

  // private getTopSlide() {

  //   this._slideListingService.getTopSlideRecordAll().subscribe(
  //     response => {
  //           //this.categoriesAllData.data = [];

  //       // if (response.body?.isSuccess) {
  //         //this.zone.run(() => { // <== added

  //           console.log("2031",response)
  //           this.categoriesAllData.data = [...this.categoriesAllData.data ,...response.data];
  //           //this.categoriesAllData.data.push(response.data);
  //           this.categoriesAllData.allData = response;
  //           console.log("2051",this.categoriesAllData.allData )
  //           this.showData = 1;
  //           this.showMore =true;
  //        // });
  //        if(response.total.current_page == response.total.last_page){
  //         this.showMore =false;
  //        }
  //   }
  //   );
  // }


  get f() {

    return this.form.controls;

  }

  SlideSort() {
    console.log("i am in");
    this.showData = 1;
    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
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
    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
    this.categoriesAllData.data = [];

    this.categoriesAllData.data = vidData.sort(function (a: any, b: any) {
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


  onChanges(e: any) {
    if (e.target.value == "viewss") {
      this.SlideSort();
    } else if (e.target.value == "atoz") {
      this.SlideSortAlpha();
    }

    console.log(e.target.value);


  }





}
