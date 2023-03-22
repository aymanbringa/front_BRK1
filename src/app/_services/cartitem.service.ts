import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../model/cartitem'; 

@Injectable({
  providedIn: 'root'
})
export class CartitemService {
  private cartUrl = 'http://localhost:8080/api/auth/cart';
  private cartContentUrl = 'http://localhost:8080/api/auth/cart/content';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  addToCart(id: any  , quantity: number, user_id: string): Observable<any> {
    console.log(quantity)
    console.log(id)
    return this.http.post(`${this.cartUrl}`, {
      id,
      quantity,
      user_id
    });
  }
  

  removeFromCart(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.cartUrl}/delete?productId=${productId}&quantity=${quantity}`, {}, {headers: this.headers});
  }

  getTotal(): Observable<number> {
    return this.http.get<number>(`${this.cartUrl}`, {headers: this.headers});
  }

  getCart(): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.cartContentUrl}`, {headers: this.headers});
  }
}
