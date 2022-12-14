import { Category } from './../interfaces/category';
import { Cart } from './../interfaces/cart';
import { Iuser } from './../interfaces/iuser';
import { Items } from './../interfaces/items';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _rooturl: string = "http://localhost:5000/foodbox"

  private _items!: Items[]
  private _user!: any
  private _cart!: Cart[]
  private _islogin: boolean = false

  constructor(private http: HttpClient) { }

  public setIsLogin(login: boolean){
    this._islogin = login
  }
  public getIsLogin(){
    return this._islogin
  }
  public setUser(user: Iuser){
    this._user = user
  }

  public getUser(){
    return this._user
  }

  public setItems(items: Items[]){
    this._items = items
  }

  public getItems(){
    return this._items
  }

  public setCart(cart: Cart[]){
    this._cart = cart
  }

  public getCart(){
    return this._cart
  }
  getItemsList(): Observable<Items[]>{
    return this.http.get<Items[]>(`${this._rooturl}/productview`)
  }

  getAllCategories(): Observable<any>{
    return this.http.get(`${this._rooturl}/category`)
  }

  signupUser(user: Iuser): Observable<any>{
    return this.http.post<Iuser>(`${this._rooturl}/signup`,user)
    .pipe( catchError(err => err))
  }

  getCategoryById(id: number): Observable<Items[]>{
    return this.http.get<Items[]>(`${this._rooturl}/${id}`)
  }

  getLogin(email: string, pass: string): Observable<any>{
    // let reqheaders = new HttpHeaders({Authorization: 'Basic' +btoa(email+':'+pass)})
    let params = new HttpParams().set('username',email)
      .append('password',pass)      
    return this.http.get(`${this._rooturl}/login`, { params })
  }

  getUserByEmail(email:string) : Observable<any>{
    return this.http.get(`${this._rooturl}/getuser/${email}`)
  }

  getCategoryItemById(id: number) : Observable<Items>{
    return this.http.get<Items>(`${this._rooturl}/categoryitem/${id}`)
  }

   addToCard(cart: Cart): Observable<any>{
    return this.http.post(`${this._rooturl}/cart/addtocart`, cart)
   }

  getItemsbyUser(id: number) : Observable<Cart[]>{
    return this.http.get<Cart[]>(`${this._rooturl}/card/show/${id}`)
  }

  DeleteItemFromCard(id: number): Observable<any> {
    return this.http.delete(`${this._rooturl}/categoryitem/delete/${id}
    `)
  }

  updateCart(item: Cart) : Observable<any> {
    return this.http.put(`${this._rooturl}/cart/addtocart`,item)
  }
  
  allItemsForAdmin(): Observable<Items[]> {
    return this.http.get<Items[]>(`${this._rooturl}/manage/product`)
  }

  updateCategoryItm(item: Items): Observable<any> {
    return this.http.put(`${this._rooturl}/manage/product`,item)
  }

  saveCategoryItm(item: Items): Observable<any> {
    return this.http.post(`${this._rooturl}/manage/product`,item)
  }

  getAllCategoriesAdmin() :Observable<any>{
    return this.http.get(`${this._rooturl}/manage/product/categories`)
  }
}
