import { Component, ViewChild, ElementRef  } from '@angular/core';
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
  @ViewChild('htmlData') htmlData!: ElementRef;
  // titless: string = 'ng2-pdf-viewer';
  public imageObject:any;
  public slideData:any = [];
  public slideId:string="";
  // public videoTableId:any;
  public slideCliecked = 2;
  public videoEmbed:string = "";
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;

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
    public embedVideoCopytext(textShare:any){
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
    
    private getData(slideId:number) {
      console.log('s-priny-gargggggggggggggggggggg', slideId)
      
      this._slideListingService.getSlideRecord(slideId).subscribe(
        response => {
        
              this.slideData = response[0];
              console.log('sssssssssssssssssssssss-ddddddddd', this.slideData)
             

              this.titleService.setTitle(this.slideData.title.toUpperCase());

              //this.videoEmbed =this.slideData.url;
              // this.videoId = this.youtube_parser(this.videoData.url);
              console.log(this.slideData.url, 'hhhhhhhhhhhh')
              console.log(typeof this.slideData.url, 'uuu');

              
              // this.slideId = this.slideData.url;
              this.slideId = this.slideData.url;
              // if(this.slideData.type == 'media'){
              //   this.videoEmbed ="<iframe class='videoEmbedCss' width='420' height='345' src='"+this.slideData.url+"'></iframe>";

              // }else{
              //   this.videoEmbed =`<iframe class='videoEmbedCss' width='420' height='345' src='https://www.youtube.com/embed/${this.slideId}'></iframe>`;
              // }
              
             
              // return new Blob([this.slideData.blob()], { type: 'application/pdf' })
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
  
       console.log("get data")
        if(this.slideCliecked == 2){
          this._slideListingService.updateSlideDownloadCount(slideId).subscribe(
            response => {  
              console.log('afterrrrrrrrrrrrrrr-clieckk', response);
              
              FileSaver.saveAs(this.slideData.url, this.slideData.slug);
              this.slideData.download_count = parseInt(this.slideData.download_count)+1;
              // alert('hi')
              this.slideCliecked = 1;
            });
        }
  }
      
}
