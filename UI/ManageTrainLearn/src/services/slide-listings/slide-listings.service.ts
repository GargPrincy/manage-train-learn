import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { HttpService } from "../common/http.service";
import { HomeList } from '../../models/common/home/home-list.model';
import { Dictionary } from "src/models/common/dictionary";


import { API } from "src/config/api";

@Injectable({
  providedIn: 'root'
})
export class SlideListingsService {
  private categoryeData:any;

  constructor(    private readonly _httpService: HttpService
    ) {    this.categoryeData = []; }
  public getCategoryRecords() {
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
  
  public getSlideRecords(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getAllSlideListing.replace('{slideSearchKey}', searchKeyword.toString()))

        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getSlideRecordsViewAll(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getAllSlideListingViewAll.replace('{slideSearchKey}', searchKeyword.toString()))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getSlideRecordsViewAllPagination(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(searchKeyword)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getTopSlideRecord() {

    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getTopSlide)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  public getTopSlideRecordAll() {

    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getTopSlideAll)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  
  public getSlideRecord(slideId:number, emailSocial:any):Observable<HomeList[]> {
    var param = new Dictionary<any>();
    param.add("searchKey", slideId)
    console.log(slideId,"dfsdf");
    console.log("token-slide-detail", emailSocial);
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getSlideDetails.replace('{slideParamId}', slideId.toString()+ "?email="+ emailSocial))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
                //  const downlaodd = new Blob([this.categoryeData.blob()], { type: 'application/pdf' })
              }
              return this.categoryeData;
            })
        );
  }
  public updateSlideDownloadCount(slideId:number, emailSocial:any):Observable<HomeList[]> {
    var param = new Dictionary<any>();
    param.add("searchKey", slideId)
    console.log("token-idididid", emailSocial);
    console.log(slideId,"dfsdf");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.updateSlideDownloadCounts.replace('{slideParamId}', slideId.toString() + "?email="+ emailSocial))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
              }
              return this.categoryeData;
              // return new Blob([this.categoryeData.blob()], { type: 'application/pdf' });
            })
        );
  }

//   public downloadPdf(): any {
//     let url='your url'
//     let headers = new Headers();
//     headers.append('Authorization', 'JWT ' + localStorage.getItem('id_token'));
//     return this.http.get(url,{  headers: headers,responseType: ResponseContentType.Blob }).map(
//         (res) => {
//             return new Blob([res.blob()], { type: 'application/pdf' })
//         })
// }


}
