import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

import { HomeList } from './../../models/common/home/home-list.model';
import { HttpService } from "../common/http.service";
import { API } from "src/config/api";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoryeData: HomeList[];
  constructor(private readonly _httpService: HttpService) { this.categoryeData = []; }
  public getCategoryRecords():Observable<HomeList[]> {
    return this._httpService.get<HomeList[]>(API.categories.getAllData)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
              }
              return this.categoryeData;
            })
        );
  }

  public getCategoryDetails(slideId:number):Observable<HomeList[]> {

    console.log(slideId,"dfsdf");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getCategoryDetails.replace('{categoryId}', slideId.toString()))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
              }
              return this.categoryeData;
            })
        );
  }
}
