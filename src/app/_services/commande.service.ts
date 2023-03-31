import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../model/commande'; 

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private readonly API_URL = 'http://localhost:8080/api/auth/commande';

  constructor(private http: HttpClient) {}

  getAllCommandes(userId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.API_URL}?userId=${userId}`);
  }

  getCommandeById(id: number, userId: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.API_URL}/${id}?userId=${userId}`);
  }

  createCommande(commande: Commande, userId: any): Observable<Commande> {
    console.log("mlkjd");
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Commande>(`${this.API_URL}`, commande, { params });
}




  updateCommande(id: number, commande: Commande, userId: number): Observable<Commande> {
    return this.http.put<Commande>(`${this.API_URL}/${id}?userId=${userId}`, commande);
  }

  deleteCommande(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}?userId=${userId}`);
  }
}
