import { Iuser } from './../../interfaces/iuser';
import { Cart } from './../../interfaces/cart';
import { UserService } from './../../services/user.service';
import { Items } from './../../interfaces/items';
import { Input, Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from "@angular/router";
import { Category } from 'src/app/interfaces/category';
import { filter, from, map } from 'rxjs';
import { selectRecordState } from 'src/app/animations';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  animations: [
    selectRecordState
  ]
})
export class ItemsComponent implements OnInit, AfterContentInit {

  items: Items[] = [];
  cart: Cart = {} as Cart
  carts: Cart[]=[]
  user!: Iuser
  addCart: boolean = false
  textSearch: string=''
  isLogin!: boolean
  selectIndex: number = 0;

  constructor(
    private userService: UserService, 
    private route: Router) { }
  
  ngAfterContentInit(): void {
  }
  
  ngOnInit(): void {
    this.isLogin = this.userService.getIsLogin()
    // firebase database
    this.items = this.userService.getItems()

    if (this.isLogin) {
      console.log(this.userService.getItems())
      this.items = this.userService.getItems().filter((item) =>  !item.disabled)
      // this.fillCart()
    }      
    
    // this.updateItems()
  }

  private updateItems(){

    // mysql database
    // this.userService.getItemsList()
    // .subscribe({
    //   next: items => {
    //     this.userService.setItems(items)
    //     this.items = this.userService.getItems()
    //     if (this.isLogin) {
    //       if (this.userService.getCart().length != 0 ){
    //         this.items.forEach(item => {
    //           item.cartItems?.forEach(cart => {
    //             this.userService.getCart().forEach(ucart => {
    //               if(ucart.id == cart.id ){
    //                 ucart.itemName = item.itemName
    //                 item.addCart = true
    //               }
    //             })
    //           })
    //         }) 
    //       }
    //     }
    //   }
    // })

  } 

  addToCart(event: any, i: any){
    this.selectIndex = i;
    this.isLogin = this.userService.getIsLogin()

    // mysql database
    // let target: any = event.target || event.srcElement || event.currentTarget
    // let idAttr = target.attributes.id
    // let id = idAttr.nodeValue
    if (!this.isLogin) {
      alert('Please Login first')
      return
    } else {
        // firebase database
        let cartItem: Items = this.items[i];
        this.cart.itemId = cartItem.id;
        this.cart.catagoryId = cartItem.categoryId
        this.cart.price = cartItem.price;
        this.cart.image = cartItem.image;
        this.cart.quantity = 1;
        this.userService.addFirebaseCartItem(this.cart);
        this.items[i].addCart = true;

          
        // mysql database 
        // this.userService.getCategoryItemById(id)
        //   .subscribe({
        //     next: data => {
        //       this.cart.itemId = data.id
        //       this.cart.price = data.price
        //       this.cart.image = data.image
        //       this.cart.quantity = 1
        //       this.cart.userId = this.userService.getUser().id
        //       this.userService.addToCard(this.cart).subscribe()
        //       this.items[i].addCart = true
        //     }
        //   })
        this.userService.setCartCount(this.userService.getCartCount()+1)
      }
  }

  removeFromCart(event: any, i:any){
    this.selectIndex = i;
    let item: Items = this.items[i];
    let cart: Cart = this.userService.getCart.find((c) =>  c.itemId == item.id)!
    let cartIndex = this.userService.getCart.findIndex((c) => c.$key === cart.$key)
    // firebase database
    this.userService.removeFirebaseCartItem(cart.$key)

    // mysql database
    // this.items[i].cartItems?.forEach(ci => {
    //   this.userService.getCart().forEach(cart => {
    //     if (cart.id == ci.id){
    //       this.userService.DeleteItemFromCard(cart.id).subscribe()
    //     }
    //   })
    // })
    this.userService.setCartCount(this.userService.getCartCount()-1)
    this.userService.getCart.splice(cartIndex, 1)
    this.items[i].addCart=false  
  }

  fillCart(){
    // firebase database
    this.carts = this.userService.getCart;

    this.userService.getItems().forEach((item) =>  {
      this.carts.forEach((cart) => {
        if (item.id === cart.itemId){
          item.addCart = true
        }
      })
    })

    // mysql database
    // this.userService.getCart().splice(0)
    // this.userService.getCartItemsbyUser(this.userService.getUser().id)
    // .subscribe(carts => {
    //   this.userService.setCartCount(carts.length)
    //   carts.forEach(cart => {
    //     this.userService.setCart(cart)
    //   })
    // })

    this.userService.setCartCount(this.userService.getCart.length)

  }
}
