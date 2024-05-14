import { Cart } from './../../interfaces/cart';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Items } from 'src/app/interfaces/items';
import { fadeEffectState, selectRecordState } from 'src/app/animations';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  animations: [
    fadeEffectState,
    selectRecordState
  ]
})
export class ItemDetailsComponent implements OnInit {
  // @HostBinding('@fadeEffect') fEffect=true;
  categoryItems: Items[] = [];
  isLogin!: boolean
  textSearch: string=''
  carts: Cart[] =[]
  cart: Cart = {} as Cart
  cid: any;
  pid: any;
  selectIndex!: number;
  _role = '';

  constructor(private userService: UserService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLogin = this.userService.getIsLogin()
    // if (this.isLogin) {
    //   this.fillCart()
    // }

    this.getItems()
  }

  getItems(){

    // firebase database
    this.activatedRoute.params.subscribe((params) => { 
      this.cid =  params['id'];
      this._role = this.userService.getUser().role;
      this.categoryItems = this.userService.getItems().filter((item) => item.    categoryId === this.cid && !item.disabled);
        // this.fillCart()
    })
    // this.pid = this.cid;
    // mysql database
    // this.activatedRoute.params.subscribe((params => {
    //   this.userService.getCategoryById(+params['id']).subscribe({
    //     next: (cItems) => {
    //       this.categoryItems = cItems
    //       if (this.userService.getCart().length != 0 ){
    //         this.categoryItems.forEach(item => {
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
    //   })
    // }))
  }

  addToCart(event: any, i: any){
    this.selectIndex = i;
    let target: any = event.target || event.srcElement || event.currentTarget
    let idAttr = target.attributes.id
    let id = idAttr.nodeValue
    if (!this.isLogin) {
      alert('Please Login first')
      return
    } else {
        // firebase database
        let cartItem: Items = this.categoryItems[i];
        this.cart.itemId = cartItem.id;
        this.cart.catagoryId = cartItem.categoryId
        this.cart.price = cartItem.price;
        this.cart.image = cartItem.image;
        this.cart.quantity = 1;
        this.userService.addFirebaseCartItem(this.cart);
        this.categoryItems[i].addCart = true;

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
        //       this.categoryItems[i].addCart = true
        //     }
        //   })
          this.userService.setCartCount(this.userService.getCartCount()+1)
      }
  }

  removFromCart(event: any, i:any){
    this.selectIndex = i;
    // firebase database
    let item: Items = this.categoryItems[i];
    let cart: Cart = this.userService.getCart.find((c) =>  c.itemId == item.id)!
    let cartIndex = this.userService.getCart.findIndex((c) => c.$key === cart.$key)
    this.userService.removeFirebaseCartItem(cart.$key)


    // mysql database
    // this.categoryItems[i].cartItems?.forEach(ci => {
    //   this.userService.getCart.forEach(cart => {
    //     if (cart.id == ci.id){
    //       this.userService.DeleteItemFromCard(cart.id).subscribe()
    //     }
    //   })
    // })
    this.userService.setCartCount(this.userService.getCartCount()-1)
    this.userService.getCart.splice(cartIndex, 1)
    this.categoryItems[i].addCart=false  
  }

  // fillCart(){
  //   this.carts.splice(0, this.carts.length)
  //   this.userService.getCartItemsbyUser(this.userService.getUser().id)
  //   .subscribe(carts => carts.forEach(cart => {
  //     this.carts.push(cart)
  //   }))
  // }

  startAnimation(){
    this.pid = this.cid
  }

}
