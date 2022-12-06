import { Items } from './../interfaces/items';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _rooturl: string = "http://localhost:8080/foodbox"

  private _items!: Items[]

  constructor(private http: HttpClient) { }

  getItemsList(): Observable<Items[]>{
    return this.http.get<Items[]>(`${this._rooturl}/productview`)
  }

  getAllCategories(): Observable<any>{
    return this.http.get(`${this._rooturl}/category`)
  }

  getCategoryById(id: number): Observable<Items[]>{
    return this.http.get<Items[]>(`${this._rooturl}/${id}`)
  }
}
