

import { HomeList } from './../../models/common/home/home-list.model';
import { Injectable } from '@angular/core';

import { API } from "src/config/api";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

// import { PagedDataModel } from "src/models/common/paged-data.model";


import { HttpService } from "../common/http.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private homeData: HomeList[];
  private socialData: any;
  
  
  public constructor(
    private readonly _httpService: HttpService
  ) {
    this.homeData = [];
  }


  public getHomeRecords():Observable<HomeList[]> {
    return this._httpService.get<HomeList[]>(API.home.getAllData)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.homeData = r.body.data ?? [];
              }
              return this.homeData;
            })
        );
  }

  public postSocialRecord(userId:any):Observable<HomeList[]> {
    
    console.log(userId,"dfsdf");
    
    let paramUrl = "?name="+userId.name+"&email="+userId.email;

    return this._httpService.get<HomeList[]>(API.social.socialLogin+paramUrl)
        .pipe(
            map( res =>{

              console.log("in services social",res);
              if (res.body?.status){

                 this.socialData = res.body;
              }
              return this.socialData;
            }
            )
        );
  }


}
