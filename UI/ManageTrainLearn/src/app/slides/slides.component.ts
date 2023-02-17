import { Component  } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { SlideListingsService } from 'src/services/slide-listings/slide-listings.service';
// import { NgImageSliderModule } from 'ng-image-video-gallery';
import { Title } from '@angular/platform-browser';
const FileSaver = require('file-saver');
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlideComponent {
  // @ViewChild('htmlData') htmlData!: ElementRef;
  // titless: string = 'ng2-pdf-viewer';
  public imageObject:any;
  public slideData:any = [];
  public slideId:string="";
  public slideIdthumbd:any = [];
  public slideurl:any ={};
  public imageSrc:string="";
  // public slideCliecked = 2;
  public slideEmbed:string = "";
  page: number = 1;
  totalPages: number = 0;
  public showGuestUserName:any = "";
  public socialToken:any = "";
  public socialEmail:any = "";
  isLoaded: boolean = false;
  public downCount: number = 0;
  limitDown: number = 9;
  public downloadCountID:number = 0;
  customOptionsthumb: OwlOptions = {
    autoplay: false,
    rewind: false /* use rewind if you don't want loop */,
    margin:10,
    loop:false,      
    dots:false,    
    autoWidth:false,    
    autoHeight:false,       
    slideTransition:'linear',
    navText:["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>","<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
    animateOut: 'fadeOut', 
    animateIn: 'fadeIn',
    navSpeed:100,
    responsive: {
      0: {
        items:2 
      },
      420: {
        items:3 
      },
      575: {
        items:5
      },
      992: {
        items:6
      },
      1200: {
        items:8,
        nav:true
      }
    },
    nav: true,
    stagePadding:1
  };

  constructor(    
      private activatedRoute: ActivatedRoute,
      private _slideListingService: SlideListingsService,
      private titleService: Title
      
    ) {
      this.imageObject = [];

    }

    ngOnInit() {
      [].slice.call(document.querySelectorAll('slide')).forEach(function(audio:any) {
        audio.muted = true;
    });
      this.activatedRoute.queryParams.subscribe(params => {
        const slideId = params['slideParamId'];
        const id = this.activatedRoute.snapshot.paramMap.get('slideParamId');
        const userId:any = this.activatedRoute.snapshot.paramMap.get('slideParamId')?.toString();

        if(this.socialEmail == "" || this.socialEmail == null) {
          this.socialEmail = localStorage.getItem('socialEmail');
        } 
        if(this.showGuestUserName == "" || this.showGuestUserName == null) {
          this.showGuestUserName = localStorage.getItem("guestUserNameMTL");
        }
        console.log(params,userId,id);

        let slideIds:number = parseInt(userId)
        this.getData(slideIds);
        const tag = document.createElement('script');
        console.log(tag, 'tag-princy')
        // tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      });
  
     //
      
    
     }

    public shareVideoCopytext(textShare:any){
      console.log(textShare, 'text-share')
      let copyText:any = document.getElementById('ytbUrl');
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices
      // alert(copyText.value)
      navigator.clipboard.writeText(copyText.value);
    }
    public embedSlideCopytext(textShare:any){
      let copyText:any = document.getElementById('embedUrl');
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices
      // alert(copyText.value)
      navigator.clipboard.writeText(copyText.value);
    }

    ngAfterViewChecked() {
     
      // if(this.showGuestUserName == "" || this.showGuestUserName == null) {
        this.showGuestUserName = localStorage.getItem("guestUserNameMTL");
      // }
      // if(this.socialEmail == "" || this.socialEmail == null) {
        this.socialEmail = localStorage.getItem('socialEmail');
      // } 
      //We loading the player script on after view is loaded
    }

    private getData(slideId:number) {
      console.log('s-priny-gargggggggggggggggggggg', slideId)
      console.log("get token-email",this.socialEmail)

      
      this._slideListingService.getSlideRecord(slideId, this.socialEmail).subscribe(
        response => {
        
              this.slideData = response;
              console.log('sssssssssssssssssssssss-ddddddddd', this.slideData)

              this.downCount = this.slideData.user_download_count;
              console.log(this.downCount, 'dowen-count')
              
              this.titleService.setTitle(this.slideData.title.toUpperCase());
              console.log(this.slideData.url, 'hhhh-url')
              this.slideId = this.slideData.url;
              this.slideIdthumbd = this.slideData.gallery;
              this.imageSrc = this.slideIdthumbd[0];

              console.log(this.slideIdthumbd, 'slideIdthumbd')

                this.slideEmbed ="<iframe width='420' height='345' src='"+this.slideData.url+"'></iframe>";
            }
           
      );

    }
    afterLoadComplete(pdf:any,ins:any) {
      console.log('afterrrrrrrrrrrrrrr', pdf)
      console.log('afterrrrr-iiiiiiiiiiiiiiiiiir', ins)
      this.imageSrc = ins;
      // this.totalPages = pdf.numPages;
      // this.isLoaded = true;
    }
    // nextPage() {
    //   this.page++;
    // }
  
    // prevPage() {
    //   this.page--;
    // }
  downloadSlide(slideId:number) {
    console.log("get data",slideId)
    console.log("get downloadCount",this.downCount)
    // console.log("get token-download",this.socialToken)
    console.log("get token-email",this.socialEmail)

       console.log("get data")
        if( this.downCount <= 9 && this.socialEmail){
          this._slideListingService.updateSlideDownloadCount(slideId, this.socialEmail).subscribe(
            response => {  
              console.log('afterrrrrrrrrrrrrrr-clieckk', response);
              
              FileSaver.saveAs(this.slideData.url, this.slideData.slug);
              this.slideData.download_count = parseInt(this.slideData.download_count)+1;
              this.getData(slideId);
              console.log(this.limitDown, 'limit-doen')
              this.downloadCountID = this.limitDown - this.downCount;
              
              console.log('wwwww', this.downloadCountID);

              // alert('hi')
              
            });
        }
  }
      
}
