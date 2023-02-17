import { Component } from '@angular/core';
// import { SocialAuthService } from  '@abacritt/angularx-social-login';
// import { SocialUser ,FacebookLoginProvider, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HomeService } from 'src/services/home/home.service';
//import { IndexModel } from 'src/models/common/index.model';
import { Title } from '@angular/platform-browser';
import { FormBuilder} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  // public user!: SocialUser;
  // socialUser!: SocialUser;

  public isLoggedin: boolean = false;
  public homeAllData:any = [];
  public subContent:string = "";
  public soundStatus:boolean =true;
  public selected: boolean = false;
  //public homeAllData : [] = [];
 // public indexModel: IndexModel;
  
 

  constructor(
    // private authService: SocialAuthService,
    private _homeService: HomeService,
    private titleService: Title,
    private formBuilder: FormBuilder

    ) {     
      this.titleService.setTitle("MTL Home");
      this.homeAllData = [];
      const fbLoginOptions = {
      scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
      return_scopes: true,
      enable_profile_selector: true
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    
    const googleLoginOptions = {
      scope: 'profile email'
    };
    // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
    
  
    /*let config = [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("Google-OAuth-Client-Id", googleLoginOptions)
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("Facebook-App-Id", fbLoginOptions)
      },
      
    ];*/

   }

   checkoutForm = this.formBuilder.group({
    searchKey: ''
  });  

  get f() { return this.checkoutForm.controls; }

  doAction(event:any){
    console.log(event.target.checked)
    if(event.target.checked == true){
      localStorage.setItem("soundProp","1" );
    } else if(event.target.checked == false){
      localStorage.setItem("soundProp","2" );
    }
  }


  ngOnInit() {
    this.titleService.setTitle("MTL Home");

   this.getData();
  //  this.authService.authState.subscribe((user) => {
  //     this.user = user;      
  //     this.isLoggedin = (user != null);
  //     console.log(this.user, 'user-name');

  //   }); /**/

    let soundStatusCheck = localStorage.getItem("soundProp");

    if(soundStatusCheck ==null ||  soundStatusCheck ==undefined ||  soundStatusCheck == "" ){
      localStorage.setItem("soundProp","1" );
      this.playAudio();
    }
    console.log(soundStatusCheck, "sound-check-status");
    this.openModelData();
  }

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

  private getData() {
    this._homeService.getHomeRecords().subscribe(
      response => {
          console.log("get data homee",response)
          this.homeAllData = response;
   
        //}
      }
    );
  }
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signInWithFB(): void {
  //   const fbLoginOptions = {
  //     enable_profile_selector: true,
  //     return_scopes: true,
  //     scope: 'email,public_profile',
  //     auth_type: 'rerequest'
  //   };
  //     this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
  //       console.log(data);
  //       console.log("princygargargrag")
  //     });
  // }



  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  openModelData() { 
    let soundStatusCheck = localStorage.getItem("soundProp");
    if( soundStatusCheck == "1" ) {
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
    }
    console.log(soundStatusCheck, "sound-check-status");
    // $('#playModal').modal('hide'); 
    // $('#settings').modal('show');  
  }
}
