import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  create(customer: any): Observable<any>{
    return this.http.post(`${environment.baseAPIUrl}/customer.json`,customer);
  }
  getAll(): Observable<any>{
    return this.http.get(`${environment.baseAPIUrl}/customer.json`).pipe(map((res) => {
      const customers:any[] = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          customers.push({...res[key], id: key});
        }
      }
      return customers;
    }));
  }

  update(customer: any, id: string): Observable<any>{
    return this.http.put(`${environment.baseAPIUrl}/customer/${id}.json`,customer);
  }

  delete(id: string): Observable<any>{
    return this.http.delete(`${environment.baseAPIUrl}/customer/${id}.json`);
  }

}
