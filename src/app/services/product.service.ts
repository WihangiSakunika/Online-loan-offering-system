import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient

  ) { }

  create(product: any): Observable<any>{
    return this.http.post(`${environment.baseAPIUrl}/product.json`,product);
  }

  getAll(): Observable<any>{
    return this.http.get(`${environment.baseAPIUrl}/product.json`).pipe(map((res) => {
      const products:any[] = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key], id: key});
        }
      }
      return products;
    }));
  }

  update(product: any, id: string): Observable<any>{
    return this.http.put(`${environment.baseAPIUrl}/product/${id}.json`,product);
  }

  delete(id: string): Observable<any>{
    return this.http.delete(`${environment.baseAPIUrl}/product/${id}.json`);
  }

}
