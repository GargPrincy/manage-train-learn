import { Component  } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { SlideListingsService } from 'src/services/slide-listings/slide-listings.service';
// import { NgImageSliderModule } from 'ng-image-video-gallery';
import { Title } from '@angular/platform-browser';
const FileSaver = require('file-saver');

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
  // public slideCliecked = 2;
  public slideEmbed:string = "";
  page: number = 1;
  totalPages: number = 0;
  public showGuestUserName:any = "";
  isLoaded: boolean = false;
  public downCount: number = 0;
  limitDown: number = 9;
  public downloadCountID:number = 0;

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


        console.log(params,userId,id);

        let slideIds:number = parseInt(userId)
        this.getData(slideIds);
        const tag = document.createElement('script');
        console.log(tag, 'tag-princy')
        // tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        if(this.showGuestUserName == "" || this.showGuestUserName == null) {
          this.showGuestUserName = localStorage.getItem("guestUserName");
        }

        
        
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

    // public missingSlideReport(slideId:any){
    //    console.log(slideId,"div id");   
    //   this._slideListingService.reportSlideMissing(slideId).subscribe(
    //     response => {
    //       console.log("get data",response)
    //      // if (response.body?.isSuccess) {
    //           //this.slideData = response;
           
    //       //  this.subContent = response.info?.content
    //        // this.users = response.body?.data?.data ?? [];
     
    //       //}
    //     }
    //   );
     
    // }

    ngAfterViewChecked() {
     
      if(this.showGuestUserName == "" || this.showGuestUserName == null) {
        this.showGuestUserName = localStorage.getItem("guestUserName");
      }
      //We loading the player script on after view is loaded
    }
    
    private getData(slideId:number) {
      console.log('s-priny-gargggggggggggggggggggg', slideId)
      
      this._slideListingService.getSlideRecord(slideId).subscribe(
        response => {
        
              this.slideData = response;
              console.log('sssssssssssssssssssssss-ddddddddd', this.slideData)

              this.downCount = this.slideData.today_download_count;
              console.log(this.downCount, 'dowen-count')
              
              this.titleService.setTitle(this.slideData.title.toUpperCase());
              console.log(this.slideData.url, 'hhhh-url')
              // this.slideId = this.slideData.url;
              this.slideId = this.slideData.url;
                this.slideEmbed ="<iframe width='420' height='345' src='"+this.slideData.url+"'></iframe>";
            }
           
      );

    }
    afterLoadComplete(pdf: any) {
      console.log('afterrrrrrrrrrrrrrr', pdf)
      this.totalPages = pdf.numPages;
      this.isLoaded = true;
    }
    nextPage() {
      this.page++;
    }
  
    prevPage() {
      this.page--;
    }
  downloadSlide(slideId:number) {
    console.log("get data",slideId)
    console.log("get downloadCount",this.downCount)

       console.log("get data")
        if( this.downCount <= 9){
          this._slideListingService.updateSlideDownloadCount(slideId).subscribe(
            response => {  
              console.log('afterrrrrrrrrrrrrrr-clieckk', response);
              
              FileSaver.saveAs(this.slideData.url, this.slideData.slug);
              this.slideData.download_count = parseInt(this.slideData.download_count)+1;
              this.getData(slideId);
              console.log(this.limitDown, 'limit-doen')
              this.downloadCountID = this.limitDown - this.downCount ;
              
              console.log('wwwww', this.downloadCountID);

              // alert('hi')
              
            });
        }
  }
      
}
