import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Router,Event,RoutesRecognized} from '@angular/router';
import * as jQuery from 'jquery';
import { HomeService } from 'src/services/home/home.service';
import { SlideListingsService } from 'src/services/slide-listings/slide-listings.service';
declare var $: any;
import { SocialAuthService , SocialUser ,FacebookLoginProvider, GoogleLoginProvider, GoogleInitOptions } from  '@abacritt/angularx-social-login';
// import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public myForm: FormGroup;

  registerForm!: FormGroup;
  submitted = false;
  
  public homeAllData:any = [];
  public socialAllData:any = [];
  public showGuestUserName:any = "";  
  public socialToken:any = "";

  public categoriesAllData:any = [];
  public catId:number=1;

  public showData = 0;
  public showModelPopup:boolean=false;
  // @ViewChild('googleBtnRef')
  // googleBtn?: ElementRef;
  // @Output() socialTokens = new EventEmitter<any>();
  public user!: SocialUser;
  socialUser!: SocialUser;
  public isLoggedin: boolean = false;
  private accessToken = '';

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private _homeService: HomeService,
    private _slideListingService: SlideListingsService,
    private authService: SocialAuthService

  ) {
    this.homeAllData = [];
    this.socialAllData = [];
    this.myForm = this.fb.group({
      name:  [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.pattern(/^[A-Za-z]+$/),
        ],
      ],
    });
    
  }

  checkoutForm = this.formBuilder.group({
    searchKey: ''
  });
  forms = new FormGroup({

    categories: new FormControl('')

  });
  playAudio(){
    let audio = new Audio();
    audio.src = "./assets/audios/click.wav";
    audio.load();
    audio.play();
  }
  pauseAudio() {
    let audio = new Audio();
    audio.src = "./assets/audios/click.wav";
    audio.load();
    audio.pause();
 
  }

  public onGoToPage2(){
    this.checkoutForm.reset();
  }
  public onSubmit() {
    console.log('Valid?---', this.checkoutForm); // true or false  this.checkoutForm   
    if(this.checkoutForm.value.searchKey !=""){

      console.log("ay",this.checkoutForm.value);
      let sessionId =   this.getRandomIntInclusive(1,9999999999);
      let navigationExtras = {
        queryParams: { 'session_id': sessionId , searchKey:this.checkoutForm.value.searchKey},
        fragment: 'anchor'
      };
  
      // Navigate to the login page with extras
      this.router.navigate(['/slide-listings',this.checkoutForm.value.searchKey]);
      // if(this.checkoutForm.value.searchKey !="" ){
        const searchValue:any = this.checkoutForm.value.searchKey
        this.getAllSlideListing(searchValue);
      // }

    }
  }
  
  public getAllSlideListing(searchKeyword:string) {
    this._slideListingService.getSlideRecords(searchKeyword).subscribe(
      response => {
          console.log("get searchhhh header",response)
          // if (response.body?.isSuccess) {
          this.categoriesAllData = response;
      
          this.showData = 1;  
      }
    );
  }
  get myFormControl() {
    return this.myForm.controls;
  }

  public getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  private getData() {
    this._homeService.getHomeRecords().subscribe(
      response => {
        console.log("get data",response)
       // if (response.body?.isSuccess) {
          this.homeAllData = response;
        //}
      }
    );
  }
 
  ngOnInit() {
    this.router.events.subscribe((event:Event) => {
      if (event instanceof RoutesRecognized) {


       let cateIds = parseInt(event.state.root.firstChild?.params["categoryId"]);
       if(isNaN(cateIds)){
        this.catId = 0;
       } else {
        this.catId = event.state.root.firstChild?.params["categoryId"];
       }
      console.log(this.catId,'princy-actaid');

      let soundStatusCheck = localStorage.getItem("soundProp");
      if(soundStatusCheck ==null ||  soundStatusCheck ==undefined ||  soundStatusCheck == "" ||  soundStatusCheck == ""){
        this.playAudio();
        console.log("if"); 
        setTimeout(function(){   
          $("#checkkkd").prop('checked', true); 
        },800) 
      } else if( soundStatusCheck == "1" ) {
        this.playAudio();
        console.log("if");   
        setTimeout(function(){
          $("#checkkkd").prop('checked', true); 
        },800) 
      } else if( soundStatusCheck == "2" ) {
        this.pauseAudio();
        console.log("if");    
        setTimeout(function(){   
          $("#checkkkd").prop('checked', false); 
        },800) 
      }else {
        console.log("elsessss111");
        this.playAudio();
        //$("#offBtn").css("display", "block");
        //$("#onBtn").css("display", "none");
      }
      console.log(soundStatusCheck,"sound-check-status");
      
    }
  });
    this.getData();
    this.socialToken = localStorage.getItem('tokensocial');
    console.log(this.socialToken, 'token-social')

    if (this.socialToken == null && localStorage.getItem("socialEmail") === null) {
      this.isLoggedin == false;
    }
  if(!this.isLoggedin && this.socialToken == null) {

  console.log('userssss-loggedinn')
    this.authService.authState.subscribe((user) => {
      console.log('userssss')
        this.user = user;
        
        this.isLoggedin = (user != null);
        console.log(this.user, 'user-name');
        console.log( this.isLoggedin , 'isLoggedin -name');
        if(user != null){
          this.postGoogleData(this.user);
        }
      });
    } /**/  
    if (localStorage.getItem("guestUserNameMTL") === null) {
      //...
      // localStorage.setItem('guestUserName', "GuestUser");
      this.showModelPopup=true;
      this.openModelData();
    }

    this.showGuestUserName = localStorage.getItem("guestUserNameMTL");
    this.openModelData();
  
  }
  ngAfterViewChecked(){
    this.socialToken = localStorage.getItem('tokensocial');
    // let emiteddd = this.socialTokens.emit(this.socialToken);
    // console.log(emiteddd, 'emiteddd-social')

    this.showGuestUserName = localStorage.getItem("guestUserNameMTL");      
    console.log(this.socialToken, 'token-social')
    if (localStorage.getItem("guestUserNameMTL") === null) {
      //...
      // localStorage.setItem('guestUserName', "GuestUser");
      this.showModelPopup=true;
      this.openModelData();
    }
  }


  public userFormSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false     
    this.submitted = true; 
    if(form.valid){
      if(form.value.name  == "" || form.value.name  == null){
        // localStorage.setItem('guestUserName', "GuestUser" );
        this.showGuestUserName = localStorage.getItem("guestUserNameMTL");      
      }else{
        localStorage.setItem('guestUserNameMTL',  form.value.name.trim());
        this.showGuestUserName = localStorage.getItem("guestUserNameMTL");      
      }
      this.hidePopup();
      this.onReset();
    }
  }

  // signInWithGoogle(): void {

  //   const googleLoginOptions: GoogleInitOptions = {
  //     oneTapEnabled: false, // default is true
  //     scopes: 'https://www.googleapis.com/auth/calendar.readonly'
  //   }; 
  //   console.log('social')

  //   // console.log(this.googleBtn, 'fgoglel-btron');
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, googleLoginOptions).then(data => {
  //     console.log('auth-gmail');
  //     console.log('auth-gmail', data);
  //   });
  // }
  postGoogleData(user:any){
    console.log('fhjkh-user', user)
    
    var socialgoogle = { 
      "name" : user.name, 
      "email" : user.email
    }

    this._homeService.postSocialRecord(socialgoogle).subscribe(respon => {
      console.log("post social",respon)
      this.socialAllData = respon;
      localStorage.setItem("tokensocial", this.socialAllData.token);
      localStorage.setItem('guestUserNameMTL', this.socialAllData.name);
      localStorage.setItem('socialEmail', this.socialAllData.email);
      // localStorage.setItem('socialId', this.socialAllData.id);
  }
);
if(this.isLoggedin == true) {
  // console.log('naigate', this.user)
  this.router.navigate(['/']);
}
  }

  // signInWithFB(): void {
  //   const fbLoginOptions = {
  //     enable_profile_selector: true,
  //     return_scopes: true,
  //     scope: 'email,public_profile',
  //     auth_type: 'rerequest'
  //   };

  //   let facebookProvider = FacebookLoginProvider.PROVIDER_ID;

  //     this.authService.signIn(facebookProvider).then(data => {
  //       console.log(data, 'data');

  //        var socialObj = { 
  //         "name" : data.response.name, 
  //         "email" : data.response.email ? data.response.email : data.response.id + "@gmail",
  //         "id"  : data.response.id 
  //       }

  //       console.log(socialObj, 'social-object')

  //       this._homeService.postSocialRecord(socialObj).subscribe(respon => {
  //             console.log("post social",respon)
  //             this.socialAllData = respon;
  //             localStorage.setItem("tokensocial", this.socialAllData.token);
  //             localStorage.setItem('guestUserNameMTL', this.socialAllData.name);
  //             localStorage.setItem('socialEmail', this.socialAllData.email);
  //             // localStorage.setItem('socialId', this.socialAllData.id);
  //         }
  //       );

  //       console.log("princygargarag")
  //       if(this.isLoggedin == true) {
  //         // console.log('naigate', this.user)
  //         this.router.navigate(['/']);
  //       }
  //     });
  // }

  signOut(): void {
    localStorage.removeItem("tokensocial");
    localStorage.removeItem('guestUserNameMTL');
    localStorage.removeItem('socialEmail');
    // localStorage.removeItem('socialId');
    this.authService.signOut();
  }

  // refreshToken(): void {console.log('refresssshhhhhhhhhhhh')
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  // getAccessToken(): void {
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  // }

  onReset() {
    this.submitted = false;
    this.myForm.reset() 
}
  hidePopup(){
    jQuery(".popup-close").click();
  }

  openModelData() { 
    this.showGuestUserName = localStorage.getItem("guestUserNameMTL");  
    console.log(this.showGuestUserName, 'guest-namee')    
    if(this.showGuestUserName == "" || this.showGuestUserName == null) {
      console.log("aya h");
      $('#raunds-row-modals').modal('show',{ backdrop: "static ", keyboard: false });

    }    
  }

}
