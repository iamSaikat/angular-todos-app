import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';
import { environment } from './../../environments/environment';
import { API_URL } from './../util/api-url';

@Injectable()
export class ApiBaseService {
  baseUrl: string = environment.api;

  constructor(private _http: Http, private _router: Router) {}

  get(endpoint: string, options?: RequestOptions): Observable<any> {
    return this._http
      .get(this.getUrl(endpoint), options || this.getRequestOptions())
      .map(v => {
        return v;
      })
      .catch(e => {
        this.shouldResetRoute(e);
        return this.handleError(e);
      })
      .share();
  }

  post(endpoint: string, body: any, options?: RequestOptions): Observable<any> {
    console.log('Request data:', body, endpoint);
    return this._http
      .post(this.getUrl(endpoint), body, options || this.getRequestOptions())
      .map(v => {
        return v;
      })
      .catch(e => {
        console.log(e);
        this.shouldResetRoute(e);
        return this.handleError(e);
      })
      .share();
  }

  put(endpoint: string, body: any, options?: RequestOptions): Observable<any> {
    return this._http
      .put(this.getUrl(endpoint), body, options || this.getRequestOptions())
      .map(v => {
        return v;
      })
      .catch(e => {
        this.shouldResetRoute(e);
        return this.handleError(e);
      })
      .share();
  }

  getUrl(url: string): string {
    return this.baseUrl + url;
  }

  handleResponse(res: Response) {
    return (res && res.json()) || {};
  }

  handleObject(res: any) {
    // to return an object as observable
    return Observable.of(res);
  }

  handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.of(null);
  }

  shouldResetRoute(e: Response | any) {
    if (e.status === 401) {
      this._router.navigate(['/']);
    }
  }

  // common stuff if we're doing the task for every call e.g the error handler
  getRequestOptions() {
    return {
      headers: new Headers({
        'Content-Type': 'application/json'
        // 'X-DRO-TOKEN' : token || '',
        // 'Allow-Credentials' : true,
      })
      // withCredentials : true,
    } as RequestOptions;
  }
}
