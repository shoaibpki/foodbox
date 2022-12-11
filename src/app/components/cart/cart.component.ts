import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from './../../interfaces/cart';
import { Items } from './../../interfaces/items';
import { Iuser } from './../../interfaces/iuser';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user!: Iuser
  cart: Cart[] = []
  subtotal: number = 0
  cartItems: number = 0
  gtotal: number = 0
  pay: boolean= false
  userId!: number

  constructor(private userService: UserService, private router: Router) {

   }

  ngOnInit(): void {

     this.userId = JSON.parse(localStorage.getItem('uid')||"" )
    this.userService.getItemsbyUser(this.userId)
      .pipe( map(data => {
        data.forEach((c,i) =>{
          this.cart.push(c)
          this.cart[i].subtotal = c.price * c.quantity
          this.gtotal = this.gtotal + (this.cart[i].subtotal ?? 0)
          // this.cart[i].userId = this.user.id
  })
      })).subscribe()
    
    
    // this.user = this.userService.getUser()
    // this.userService.setCart(this.user.cartItems)
    // console.log(this.user)
    
    // this.userService.getCart().forEach((cart, i) => {
    //   this.cart.push(cart)
    // this.cart[i].subtotal = c.price * c.quantity
    // this.gtotal = this.gtotal + (this.cart[i].subtotal ?? 0)
    // this.cart[i].userId = this.user.id
// })
  }

  changeFn(event: any) {
    let target: any = event.target || event.srcElement || event.currentTarget
    let idAttr = target.attributes.id
    let index: number= idAttr.nodeValue

    this.gtotal = this.gtotal - (this.cart[index].subtotal ?? 0)
    this.cart[index].quantity = event.target.value
    this.cart[index].subtotal = event.target.value * this.cart[index].price;
    this.gtotal = this.gtotal + (this.cart[index].subtotal ?? 0)

  }
  
  deleItem(event: any, element: any){
    let target: any = event.target || event.srcElement || event.currentTarget
    let idAttr = target.attributes.id
    let id = idAttr.nodeValue
    this.userService.DeleteItemFromCard(id).subscribe()
    this.gtotal = this.gtotal - (this.cart[element].subtotal ?? 0)
    this.cart.splice(element,1)
    console.log(this.cart)
  }
  back(){
    this.router.navigate([''])
  }

  saveCart(){
    if (this.cart.length == 0) {
      this.router.navigate([''])
    }else{
      this.cart.forEach((c) => {
        console.log(c)
        this.userService.updateCart(c).subscribe()
      })
      // this.userService.paymentConfirm(this.userId).subscribe()
      this.cart.splice(0)
      this.gtotal = 0
      this.pay = true
    }
  }
}
