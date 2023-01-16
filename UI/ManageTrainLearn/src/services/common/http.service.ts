import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Dictionary } from 'src/models/common/dictionary';
import { Observable } from 'rxjs';
import { ApiResponseModel } from 'src/models/common/api-response.model';
// import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) { }

  public get<Toutput>(url: string, params: Dictionary<any>=new Dictionary<any>()): Observable<HttpResponse<ApiResponseModel<Toutput>>> {

    let httpParams;
    if (params.Count>0) {
        httpParams = this.setParams(params);
    }

    return this.http.get<ApiResponseModel<Toutput>>(url,{ params: httpParams, observe: "response" });
  }

  public post<Toutput>(url: string, body: any): Observable<HttpResponse<ApiResponseModel<Toutput>>> {
    return this.http.post<ApiResponseModel<Toutput>>(url, body, {observe: 'response'});
  }

  private setParams(params: Dictionary<any>): HttpParams {

    let httpParams = new HttpParams();

    if (params.Count>0){
      params.Keys.forEach(k => httpParams = httpParams.append(k, params.getValue(k)));
    }

    return httpParams;
  }
}
