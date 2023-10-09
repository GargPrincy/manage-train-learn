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
  private categoryviewData: any;
  constructor(private readonly _httpService: HttpService) { this.categoryeData = []; this.categoryviewData = []; }
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

  // public getCategoryView(slideIds:number):Observable<HomeList[]> {

  //   console.log(slideIds,"dfsdf");
  //   //const searchDataSend = {"searchKey":searchKeyword};
  //   return this._httpService.get<HomeList[]>(API.categories.getAllCategoryListingViewAll.replace('{topicId}', slideIds.toString()))
  //       .pipe(
  //           map( r => {
  //             console.log("in services",r);
  //             if (r.body?.status){
  //               // this.categoryviewData =  this.categoryeData;
  //                this.categoryeData = r?.body.data ?? [];
  //               //  this.categoryviewData.total = r?.body ?? [];

  //               //  this.categoryeData =  this.categoryviewData;
  //             }
  //             // console.log(this.categoryviewData.data, 'princy-cate')
  //             // console.log(this.categoryviewData.total, 'total-last-next-cate')
  //             return this.categoryeData;

  //           })
  //       );
  // }

  public getCategoryTopic(slideIda:number, topc:number):Observable<HomeList[]> {

    console.log(slideIda,"dfsdf");
    console.log(topc,"cateId-pricy");
    //const searchDataSend = {"searchKey":searchKeyword};
   
    return this._httpService.get<HomeList[]>(API.categories.getTopic.replace('{categoryId}', slideIda.toString()).replace('{topicId}', topc.toString()))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryviewData.data = r.body.data ?? [];
                 this.categoryviewData.total = r?.body ?? [];

                //  this.categoryeData =  this.categoryviewData;

                //  this.categoryviewData.total = r?.body ?? [];
              }
              // console.log(this.categoryviewData.data, 'princy-topic')
              // console.log(this.categoryviewData.total, 'topic-next-cate')
              return this.categoryviewData;

            })
        );
  }
}
