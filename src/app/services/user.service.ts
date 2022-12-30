import { Category } from './../interfaces/category';
import { Cart } from './../interfaces/cart';
import { Iuser } from './../interfaces/iuser';
import { Items } from './../interfaces/items';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, Subject, tap, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _rooturl: string = "http://localhost:8080/foodbox"

  private _items!: Items[]
  private _user: Iuser = {} as Iuser
  private _cart: Cart[] =[]
  private _islogin: boolean = false
  private _cartCount: number = 0
  public cartChanged: BehaviorSubject<number> = new BehaviorSubject<number>(this._cartCount)
  constructor(private http: HttpClient) { }

  public setCartCount(count: number): void{
    this._cartCount = count
    this.cartChanged.next(this._cartCount)
  }
  public getCartCount(): number{
    return this._cartCount
  }
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

  public setCart(cart: Cart){
    this._cart.push(cart)
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

  saveCategory(cat: Category): Observable<any>{
    return this.http.post(`${this._rooturl}/category`,cat)
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

  getUserByid(id: number) : Observable<Iuser> {
    return this.http.get<Iuser>(`${this._rooturl}/user/${id}`)
  }

  getCategoryItemById(id: number) : Observable<Items>{
    return this.http.get<Items>(`${this._rooturl}/categoryitem/${id}`)
  }

   addToCard(cart: Cart): Observable<any>{
    return this.http.post(`${this._rooturl}/cart/addtocart`, cart)
   }

  getCartItemsbyUser(id: number) : Observable<Cart[]>{
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

  getAllCategoriesAdmin() :Observable<Category[]>{
    return this.http.get<Category[]>(`${this._rooturl}/manage/product/categories`)
  }
}
