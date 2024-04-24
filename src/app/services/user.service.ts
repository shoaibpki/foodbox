import { Items } from 'src/app/interfaces/items';
import { Category } from './../interfaces/category';
import { Cart } from './../interfaces/cart';
import { Iuser } from './../interfaces/iuser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, Subject, tap, BehaviorSubject } from 'rxjs';
import { Database, getDatabase, onValue, push, ref, remove, set, update } from "firebase/database"
import { UserCredential, createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { formatDate } from '@angular/common';
import { Sales } from '../interfaces/sales';


@Injectable({
providedIn: 'root'
})
export class UserService {

  private _rooturl: string = "http://localhost:8081/foodbox"

  private _items: Items[] = [];
  private _user: Iuser = {} as Iuser
  private _cart: Cart[] =[]
  private _islogin: boolean = false
  private _cartCount: number = 0
  private _catagories: Category[] = []
  private _sales: Sales[]= [];
  loginMenu: boolean = false;
  public cartChanged: BehaviorSubject<number> = new BehaviorSubject<number>(this._cartCount)
  constructor(private http: HttpClient) { }

  get getSales(): Sales[]{
    return this._sales;
  }

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

  public getCatagories(){
    return this._catagories;
  }

  get getCart(): Cart[] {
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

  registerFirebaseUser(email: string, password: string) : Promise<UserCredential>{
    let auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
  }

  loginFirebaseUser(email: string, password: string): Promise<UserCredential>{
    let auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  getFirebaseCatagories(){
    this._catagories = [];
    let db = getDatabase();
    let uref = ref(db,`catagories`);
    onValue(uref, (snapShot) => {
      snapShot.forEach((childSnap) => {
        // let $key = childSnap.key;
        this._catagories.push(childSnap.val())
      })
    }, { onlyOnce: true })
    return this._catagories
  }

  getFirebaseCatagoryItems(){
    this._items = [];
    let db = getDatabase();
    let uref = ref(db,`catagoryItems`);
    onValue(uref, (snapShot) => {
      snapShot.forEach((childSnap) => {
        // let $key = childSnap.key;
        this._items.push(childSnap.val())
      })
    }, {onlyOnce: true});
    return this._items;
  }

  getFirebaseItemsByCatagoryId(id: number){
    this._items = [];
    let db = getDatabase();
    let uref = ref(db,`catagoryItems`);
    onValue(uref, (snapShot) => {
      snapShot.forEach((childSnap) => {
        let $key = childSnap.key;
        if (childSnap.val().categoryId === id){
          this._items.push({... childSnap.val(), $key })
        }
      })
    }, {onlyOnce: true})
    return this._items

  }
  getFirebaseUser(uid: string): Iuser{
    let db = getDatabase();
    let uRef = ref(db, `users/${uid}`);
    this._user.cartItems = [];
    onValue(uRef, (snapshot) => {
      this._user.email = snapshot.val().email;
      this._user.name = snapshot.val().name;
      this._user.role = snapshot.val().role;
      this._user.password = snapshot.val().password;
      this._user.cartItems = snapshot.val().cartItems;
    })
    this._user.$key = uid;
    return this._user
  }
  getFirebaseSales(){
    let db = getDatabase();
    let uRef = ref(db, `users/${this._user.$key}/sales`);
    let $key = '';
    let sale: Cart[] = [];
onValue(uRef, (snapshot) => {
      snapshot.forEach((childSnap) => {
        $key = childSnap.key;
        childSnap.forEach((cart) => {
          sale.push(cart.val())
        })
        this._sales.push({ cartItems: sale, $key})
        sale = []
      });
    })
    return this._sales;
  }
  getFirebaseCartItems(){
    this._cart = []
    let db = getDatabase();
    let uRef = ref(db, `users/${this._user.$key}/cartItems`);
    onValue(uRef, (snapshot) => {
      snapshot.forEach((chilSnap) => {
        let $key = chilSnap.key;
        this._cart.push({...chilSnap.val(), $key })
      })
    }, { onlyOnce: true });
    return this._cart;
  }

  addFirebaseCartItem(cart: Cart){
    let db = getDatabase();
    let $key = push(ref(db, `users/${this._user.$key}/cartItems`), cart).key;
    this._cart.push({ ...cart, $key })
    
  }
  addFirebaseUser(uid: any, user: Iuser){
    let db = getDatabase();
    let uRef = ref(db, `users/${uid}`);
    set(uRef, user);
  }
  addFirebaseCatagoryItem(item: Items){
    item.disabled = false
    let db = getDatabase();
    let cRef = ref(db, `catagoryItems`);
    let key = push(cRef, item).key;
    item.id = key;
    set(ref(db, `catagoryItems/${key}`),item);
  }
  addFirebaseCatagory(catagory: Category){
    catagory.disabled = false;
    let db = getDatabase();
    let key = push(ref(db, `catagories`)).key;
    catagory.id = key;
    set(ref(db, `catagories/${key}`), catagory);
  }

  updateFirebaseCart(cart: Cart){
    let uCart = {} as Cart
    uCart.catagoryId = cart.catagoryId;
    uCart.price = cart.price;
    uCart.quantity = cart.quantity;
    uCart.itemId = cart.itemId;
    uCart.image = cart.image;
    let db = getDatabase();
    set(ref(db, `users/${cart.userId}/cartItems/${cart.$key}`),uCart);
  }
  updatefirebaseCatagoryItm(item: Items){
    let db = getDatabase();
    let itm: Items = {
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      disabled: item.disabled,
      categoryId: item.categoryId,
      availableQty: item.availableQty,
      price: item.price,
      image: item.image
    }
    let cRef = ref(db, `catagoryItems/${item.id}`);
    set(cRef,itm)
  }

  paidFirebaseCart(){
    let db = getDatabase();
    let saleDate = formatDate(new Date,'YYYY-MM-dd','en-US'); 
    let uRef = ref(db, `users/${this._user.$key}/sales/${saleDate}`);
    let sale = {} as Cart;
    this._cart.forEach((cart) => {
        sale.saleDate= saleDate;
        sale.itemId= cart.itemId;
        sale.quantity= cart.quantity
        sale.price= cart.price
        sale.subtotal= cart.subtotal
        sale.catagoryId= cart.catagoryId
        sale.userId= cart.userId
        sale.paymentMode= 'CREDIT_CARD'
        push(uRef,sale);
    });
    remove(ref(db, `users/${this._user.$key}/cartItems`));
    this._cart = [];
  }

  removeFirebaseCartItem(key: string){
    let db = getDatabase();
    let uRef = ref(db, `users/${this._user.$key}/cartItems/${key}`);
     return remove(uRef);
  }

  logoutFireBaseUser(){
    let auth = getAuth();
    signOut(auth).then(() => console.log('Logout successfully!'));
  }

}
