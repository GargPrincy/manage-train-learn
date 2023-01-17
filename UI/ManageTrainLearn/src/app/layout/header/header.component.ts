import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import * as jQuery from 'jquery' ;
import { HomeService } from 'src/services/home/home.service';
import { SlideListingsService } from 'src/services/slide-listings/slide-listings.service';
declare var $: any;


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
  public showGuestUserName:any = "";

  public categoriesAllData:any = [];

  public showData = 0;
  public showModelPopup:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private _homeService: HomeService,
    private _slideListingService: SlideListingsService,
    

  ) {
    this.homeAllData = [];
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

  public onGoToPage2(){
    this.checkoutForm.reset();
  }
  public onSubmit() {
    console.log("ay",this.checkoutForm.value);

    let sessionId =   this.getRandomIntInclusive(1,9999999999);
    let navigationExtras = {
      queryParams: { 'session_id': sessionId , searchKey:this.checkoutForm.value.searchKey},
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/slide-listings',this.checkoutForm.value.searchKey]);
    if(this.checkoutForm.value.searchKey !="" ){
      const searchValue:any = this.checkoutForm.value.searchKey
      this.getAllSlideListing(searchValue);
    }

  }
  
  public getAllSlideListing(searchKeyword:string) {
    this._slideListingService.getSlideRecords(searchKeyword).subscribe(
      response => {
          console.log("get searchhhh header",response)
          // if (response.body?.isSuccess) {
          this.categoriesAllData = response;
      
          this.showData = 1;
       
          //  this.subContent = response.info?.content
          // this.users = response.body?.data?.data ?? [];   
         //}
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
    this.getData();  
    if (localStorage.getItem("guestUserName") === null) {
      //...
      // localStorage.setItem('guestUserName', "GuestUser");
      this.showModelPopup=true;
      this.openModelData();
    }

    this.showGuestUserName = localStorage.getItem("guestUserName");
    this.openModelData();
  
  }
  public userFormSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false     
    this.submitted = true; 
    if(form.valid){
      if(form.value.name  == "" || form.value.name  == null){
        localStorage.setItem('guestUserName', "GuestUser" );
        this.showGuestUserName = localStorage.getItem("guestUserName");      
      }else{
        localStorage.setItem('guestUserName',  form.value.name.trim());
        this.showGuestUserName = localStorage.getItem("guestUserName");      
      }
      this.hidePopup();
      this.onReset();
    }
    
    

  }
  onReset() {
    this.submitted = false;
    this.myForm.reset() 
}
  hidePopup(){
    jQuery(".popup-close").click();
  }

  openModelData() { 
    this.showGuestUserName = localStorage.getItem("guestUserName");      
    if(this.showGuestUserName == "" || this.showGuestUserName == null) {
      console.log("aya h");
      $('#raund-modaljohen').modal('show',{ backdrop: "static ", keyboard: false });
      //$("#raund-modal").modal();

    }    
  }

}
