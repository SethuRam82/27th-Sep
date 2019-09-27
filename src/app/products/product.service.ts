import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';


@Injectable( {
  providedIn: 'root'
}
)
export class ProductService {
  private productUrl = 'D:/products.json';
  // private productUrl =  'https://27th-sep.stackblitz.io/api/products/products.json';
  // private productUrl = 'api/products/products.json'; 

constructor(private http: HttpClient)
{

}

getProducts(): Observable<IProduct[]>
{
  return this.http.get<IProduct[]>
  (this.productUrl).pipe(tap (data => console.log("All:" + JSON.stringify(data))),
    catchError(this.handleError));

}
  // return [
    // {
    //         "productID": 2,
    //         "productName": "Garden Cart",
    //         "productCode": "GDN-0023",
    //         "releaseDate": "March 18, 2016",
    //         "description": "15 gallon capacity rolling garden cart",
    //         "price": 23.99,
    //         "starRating": 4.3,
    //         "imageUrl": "https://openclipart.org/image/300px/garden_cart.png"
    // },
    // {
    //         "productID": 5,
    //         "productName": "Hammer",
    //         "productCode": "GDN-0012",
    //         "releaseDate": "Apri 18, 2017",
    //         "description": "curved claw steel hammer",
    //         "price": 3.99,
    //         "starRating": 3.2,
    //         "imageUrl": "https://openclipart.org/image/300px/hammer.png"
    // }
    
  // ]
private handleError (err: HttpErrorResponse)
{
  let errorMessage ='';
  if(err.error instanceof ErrorEvent)
  {errorMessage = `An error occured :${err.error.message}`;
  }
  else 
  {
    errorMessage = `Server returned code: ${err.status}, error message is:${err.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}
}