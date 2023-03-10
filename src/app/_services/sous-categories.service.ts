import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SousCategories } from '../model/sous-categories'; 

@Injectable({
  providedIn: 'root'
})
export class SousCategoriesService {

  private apiUrl = 'http://localhost:8080/api/auth/sous-categories';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllSousCategories(): Observable<SousCategories[]> {
    return this.http.get<SousCategories[]>(this.apiUrl);
  }

  getSousCategorieById(id: number): Observable<SousCategories> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SousCategories>(url);
  }

  createSousCategorie(categorie: SousCategories): Observable<SousCategories> {
    console.log('jhgsf');
    return this.http.post<SousCategories>(this.apiUrl, categorie, this.httpOptions);
  }

  updateSousCategorie(categorie: SousCategories): Observable<SousCategories> {
    const url = `${this.apiUrl}/${categorie.id}`;
    return this.http.put<SousCategories>(url, categorie, this.httpOptions);
  }

  deleteSousCategorie(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
