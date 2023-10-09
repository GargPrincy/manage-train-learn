import { Component, OnInit  } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { SlideListingsService } from 'src/services/slide-listings/slide-listings.service';
// import { NgImageSliderModule } from 'ng-image-video-gallery';
import { Title } from '@angular/platform-browser';
const FileSaver = require('file-saver');
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from 'src/services/home/home.service';
import { SocialAuthService , SocialUser ,FacebookLoginProvider, GoogleLoginProvider, GoogleInitOptions } from  '@abacritt/angularx-social-login';
declare var $: any;


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
  public downloadsData:any;
  public slideId:string="";
  public slideIdthumbd:any = [];
  public slideurl:any ={};
  public imageSrc:string="";
  // public slideCliecked = 2;
  public slideEmbed:string = "";
  page: number = 1;
  totalPages: number = 0;
  public showGuestUserName:any = "";
  public guestUserWhenDownload:any = "";
  public socialToken:any = "";
  public socialEmail:any = "";
  isLoaded: boolean = false;
  public downCount: number = 0;
  limitDown: number = 10;
  public slideIdss : any;
  public errors:any;
  public downloadCountID:number = 0;
  public isLoggedin: boolean = false;
  public user!: SocialUser;
  socialUser!: SocialUser;
  public socialAllData:any = [];
  lastItem:any;
  public modalShoiw:boolean=false;

  customOptionsthumb: OwlOptions = {
    autoplay: false,
    rewind: false /* use rewind if you don't want loop */,
    margin:10,
    loop:false,      
    dots:false,    
    autoWidth:false,  
    navSpeed:60,  
    autoHeight:false,
    startPosition: 1,      
    slideTransition:'linear',
    navText:["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>","<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
    animateOut: 'fadeOut', 
    animateIn: 'fadeIn',
    responsive: {
      0: {
        items:2,
        slideBy:2,
      },
      420: {
        items:3,
        slideBy:5,
      },
      575: {
        items:5,
        slideBy:6,
      },
      992: {
        items:8,
        slideBy:8,
      },
      1200: {
        items:10,
        slideBy:10,
        nav:true
      }
    },
    nav: true,
    stagePadding:1
  };

 

  customOptionsthumbs: OwlOptions = {
    autoplay: false,
    rewind: false /* use rewind if you don't want loop */,
    margin:10,
    loop:false,      
    dots:false,    
    autoWidth:false,  
    navSpeed:100,  
    autoHeight:false,       
    navText:["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>","<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
    animateOut: 'fadeOut', 
    animateIn: 'fadeIn',
    items:1,
    nav: true,
    stagePadding:1,
    mouseDrag  : false,
  };
  
  constructor(    
      private activatedRoute: ActivatedRoute,
      private _slideListingService: SlideListingsService,
      private titleService: Title,
      private router: Router,
      private _homeService: HomeService,
      private authService: SocialAuthService, 
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
        // if(this.showGuestUserName == "" || this.showGuestUserName == null) {
        //   this.showGuestUserName = localStorage.getItem("guestUserNameMTL");
        // }
        console.log(params,userId,id);  
        if(this.guestUserWhenDownload == "" || this.guestUserWhenDownload == null) {
          this.guestUserWhenDownload = localStorage.getItem("guestUserDownload");
        }

        let slideIds:number = parseInt(userId)

        this.slideIdss = parseInt(userId)
        this.getData(slideIds);
        const tag = document.createElement('script');
        console.log(tag, 'tag-princy')
        // tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      });

      // if(localStorage.getItem("socialEmail") != '' || localStorage.getItem("socialEmail") != null){
      //   console.log('ngafterviewinit---->>ifffffffffffffffff');
      //     this.showGuestUserName = localStorage.getItem("guestUserNameMTL");
      //   }
       console.log(localStorage.getItem("socialEmail"), 'princy-loginnn') 
      if(localStorage.getItem("socialEmail") === null) {
        // this.socialToken = localStorage.getItem('tokensocial');
        console.log('userssss-loggedinn-slideess', this.socialToken)
          this.authService.authState.subscribe((user) => {
            console.log('userssss-slideess')
              this.user = user;
              
              this.isLoggedin = (user != null);
              console.log(this.user, 'user-name-slideess');
              console.log( this.isLoggedin , 'isLoggedin -name');
              if(user != null){
                this.postGoogleData(this.user);
              }
            });
          }
  
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
        this.guestUserWhenDownload = localStorage.getItem("guestUserDownload");
      // }
      // if(this.socialEmail == "" || this.socialEmail == null) {
        this.socialEmail = localStorage.getItem('socialEmail');

        console.log($('#customOptionsthumbs').find('.owl-next.disabled').closest('.owl-nav').length, '<---ngaftervieww---->>>')
        console.log('modal-show', this.modalShoiw)

        if($('#customOptionsthumbs').find('.owl-next.disabled').closest('.owl-nav').length == 1 && this.modalShoiw == false){
          // console.log('modal-show', this.modalShoiw)
    
    
          $('#LastItem').modal('show');
          this.modalShoiw = true;
          // console.log('modal-show', this.modalShoiw)
         }
         else if($('#customOptionsthumbs').find('.owl-next.disabled').closest('.owl-nav').length == 0 && this.modalShoiw == true){
         console.log('modal-show-elseifff', this.modalShoiw)
          this.modalShoiw = false;
         }

      // } 
      //We loading the player script on after view is loaded
    }

    private getData(slideId:number) {
      console.log('s-priny-gargggggggggggggggggggg', slideId)
      console.log("get token-email",this.socialEmail)
      this.socialEmail = localStorage.getItem('socialEmail');
      
      this._slideListingService.getSlideRecord(slideId, this.socialEmail).subscribe(
        response => {
        
              this.slideData = response;
              console.log('sssssssssssssssssssssss-ddddddddd', this.slideData)

              // this.downCount = this.slideData.user_download_count;
              // console.log(this.downCount, 'dowen-count')
              
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

    // afterLoadComplete(pdf:any,ins:any, ind:number) {
    //   this.imageSrc = ins;
    //   this.customOptionsthumbs = { ...this.customOptionsthumbs, startPosition : ind}
    // }

    afterLoadComplete(pdf:any,ins:any, ind:number) {
      console.log(ind, 'iii-length')
      console.log(ins, 'iii-inssddd')
      this.imageSrc = ins;
      this.customOptionsthumbs = { ...this.customOptionsthumbs, startPosition : ind}
      if(this.lastItem == ind){
        console.log('item-last-item')
        $('#LastItem').modal('show',{ backdrop: "static ", keyboard: false });
        // alert('hi length over there slides')
      }
    }




  downloadSlide(slideId:number) {
    console.log("get data",slideId)
    // console.log("get downloadCount",this.downCount)
    // console.log("get token-download",this.socialToken)
    // console.log("get token-email",this.socialEmail)
    console.log("get book-email-localstorage",localStorage.getItem('socialEmail'))
    this.socialEmail = localStorage.getItem('socialEmail');
    

       console.log("get data email", this.socialEmail);
        if(this.socialEmail != null){
          this._slideListingService.updateSlideDownloadCount(slideId, this.socialEmail).subscribe(
            response => {  
              console.log('afterrrrrrrrrrrrrrr-clieckk', response);
              this.downloadsData = response;
              this.downCount = this.downloadsData.user_download_today;
              if(this.downloadsData.user_download_today <= 10){
                console.log('gii-before-10')

                FileSaver.saveAs(this.slideData.url, this.slideData.slug);
                this.slideData.download_count = parseInt(this.slideData.download_count)+1;
                this.getData(slideId);
                console.log(this.limitDown, 'limit-doen')
                this.downloadCountID = this.limitDown - this.downCount;
                
                console.log('wwwww', this.downloadCountID);
  
                // alert('hi')
              }
              
             
              
            },error => {
              this.errors = error.status;
              console.log( this.errors, 'erroee--generateee')
              // alert(error.error.message)
            });
        }
  }


  signInWithFB(): void {
    const fbLoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'email,public_profile',
      auth_type: 'rerequest'
    };

    let facebookProvider = FacebookLoginProvider.PROVIDER_ID;

      this.authService.signIn(facebookProvider).then(data => {
        console.log(data, 'data');

         var socialObj = { 
          "name" : data.response.name, 
          "email" : data.response.email,
          "id"  : data.response.id 
        }

        console.log(socialObj, 'social-object')

        this._homeService.postSocialRecord(socialObj).subscribe(respon => {
              console.log("post social",respon)
              this.socialAllData = respon;
              localStorage.setItem("tokensocial", this.socialAllData.token);
              localStorage.setItem('guestUserNameMTL', this.socialAllData.name);
              localStorage.setItem('socialEmail', this.socialAllData.email);
              // localStorage.setItem('socialId', this.socialAllData.id);
              let slideIdssDownload:number =  this.slideIdss;
              this.downloadSlide(slideIdssDownload)
          }
        );

        console.log("princygargarag")
      });
  }


  postGoogleData(user:any){
    console.log('fhjkh-user-slides', user)
    
    var socialgoogle = { 
      "name" : user.name, 
      "email" : user.email
    }

    this._homeService.postSocialRecord(socialgoogle).subscribe(respon => {
      console.log("post social",respon)
      this.socialAllData = respon;
      localStorage.setItem("tokensocial", this.socialAllData.token);
      this.showGuestUserName = localStorage.setItem('guestUserNameMTL', this.socialAllData.name);
      localStorage.setItem('socialEmail', this.socialAllData.email);
      // localStorage.setItem('socialId', this.socialAllData.id);
      this.showGuestUserName = localStorage.getItem("guestUserNameMTL");
      let slideIdssDownload:number =  this.slideIdss;
      this.downloadSlide(slideIdssDownload)
  });

  }
      
}
