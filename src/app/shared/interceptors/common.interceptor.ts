import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(request.params);

    //Check online status
    if(!window.navigator.onLine){
      this.toastr.warning('Message','You are in offline! Please check internet connection')
    }else{
      this.toastr.success('Message','You are online!')
    }

    //If we want to use this only  customer doing inside if ladder
    if(request.url.includes('customer')){
      request = request.clone({
        setHeaders:{
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization' : 'cjasdjkcnaocjnklmsalkjfa65465456asdkjhajiwdasc65165askdjhqwbasc65456872348723kjsndjkcsdcm65465asckbjkssdcsdc'
        }
      });
    }

    // request = request.clone({
    //   setHeaders:{
    //     'content-type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Authorization' : 'cjasdjkcnaocjnklmsalkjfa65465456asdkjhajiwdasc65165askdjhqwbasc65456872348723kjsndjkcsdcm65465asckbjkssdcsdc'
    //   }
    // });


    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) =>{
        if (err.error instanceof ErrorEvent) {
                 this.toastr.error('Server side Error occurred', 'Error');
               } else {
                 this.toastr.error(`Error occurred. Please contact Admin`, 'Error');
               }
        return throwError(null);
      })
    );



  }
}

//const headers : HttpHeaders =  new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
