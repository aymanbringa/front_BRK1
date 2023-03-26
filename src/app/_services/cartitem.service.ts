import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CartItem } from '../model/cartitem'; 

@Injectable({
  providedIn: 'root'
})
export class CartitemService {
  private cartUrl = 'http://localhost:8080/api/auth/cart';
  private cartContentUrl = 'http://localhost:8080/api/auth/cart/content';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  addToCart(productId: number, quantity: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.cartUrl}?productId=${productId}&quantity=${quantity}&userId=${userId}`, null, { headers: this.headers });
  }
  
  removeFromCart(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.cartUrl}/delete?productId=${productId}&quantity=${quantity}`, {}, {headers: this.headers});
  }

  getTotal(userId: number): Observable<number> {
    return this.http.get<number>(`${this.cartUrl}?userId=${userId}`, { headers: this.headers });
  }
  
  getCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.cartUrl}?userId=${userId}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  
}
