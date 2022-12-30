import { Iuser } from './../../interfaces/iuser';
import { Cart } from './../../interfaces/cart';
import { UserService } from './../../services/user.service';
import { Items } from './../../interfaces/items';
import { Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { map } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items!: Items[]
  cart: Cart = {} as Cart
  carts: Cart[]=[]
  user!: Iuser
  addCart: boolean = false
  textSearch: string=''
  isLogin!: boolean

  constructor(
    private userService: UserService, 
    private route: Router) { }

  ngOnInit(): void {
    this.isLogin = this.userService.getIsLogin()
    if (this.isLogin) {
      this.fillCart()
    }

    this.userService.getItemsList()
      .subscribe({
        next: items => {
          this.userService.setItems(items)
          this.items = this.userService.getItems()
          if (this.isLogin) {
            if (this.userService.getCart().length != 0 ){
              this.items.forEach(item => {
                item.cartItems?.forEach(cart => {
                  this.userService.getCart().forEach(ucart => {
                    if(ucart.id == cart.id ){
                      ucart.itemName = item.itemName
                      item.addCart = true
                    }
                  })
                })
              }) 
            }
          }
        }
      })
      console.log(this.userService.getCart())
  }

  addToCart(event: any, i: any){
    this.isLogin = this.userService.getIsLogin()
    let target: any = event.target || event.srcElement || event.currentTarget
    let idAttr = target.attributes.id
    let id = idAttr.nodeValue
    if (!this.isLogin) {
      alert('Please Login first')
      return
    } else {
        this.userService.getCategoryItemById(id)
          .subscribe({
            next: data => {
              this.cart.itemId = data.id
              this.cart.price = data.price
              this.cart.image = data.image
              this.cart.quantity = 1
              this.cart.userId = this.userService.getUser().id
              this.userService.addToCard(this.cart).subscribe()
              this.items[i].addCart = true
            }
          })
          this.userService.setCartCount(this.userService.getCartCount()+1)
      }
  }

  removFromCart(event: any, i:any){
    this.items[i].cartItems?.forEach(ci => {
      this.userService.getCart().forEach(cart => {
        if (cart.id == ci.id){
          this.userService.DeleteItemFromCard(cart.id).subscribe()
        }
      })
    })
    this.userService.setCartCount(this.userService.getCartCount()-1)
    this.items[i].addCart=false  
  }

  fillCart(){
    this.userService.getCart().splice(0)
    this.userService.getCartItemsbyUser(this.userService.getUser().id)
    .subscribe(carts => {
      this.userService.setCartCount(carts.length)
      carts.forEach(cart => {
        this.userService.setCart(cart)
      })
    })
  }
}
