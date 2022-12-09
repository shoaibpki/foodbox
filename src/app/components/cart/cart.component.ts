import { Router } from '@angular/router';
import { Cart } from './../../interfaces/cart';
import { Items } from './../../interfaces/items';
import { Iuser } from './../../interfaces/iuser';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user!: Iuser
  items!: Items[]
  cart!: Cart[]
  subtotal: number = 0
  price: number = 0
  gtotal: number = 0
  qty: number=0
  constructor(private userService: UserService, private router: Router) {
    let userid: any = localStorage.getItem('uid')
    this.userService.getItemsbyUser(userid).subscribe(data => this.cart = data)
    console.log(this.cart)

   }

  ngOnInit(): void {


    // this.userService.getUserByEmail(email)
    //   .subscribe(data => this.userService.setUser(data))

    // this.cart = this.userService.getUser().cartItems
    // this.userService.getItemsbyUser(userid).subscribe(data => this.cart = data)
  }

  changeFn(e: any) {
    this.gtotal = 0
    this.price =  this.userService.getCart()[0].price
    this.subtotal = e.target.value * this.price;
    this.gtotal = this.subtotal

    // if (this.qty < e.target.value){
    //   this.gtotal =  this.gtotal + this.subtotal
    // } else {
    //   this.gtotal =  this.gtotal - this.subtotal
    // }
    // this.qty = e.target.value
  }
  
  deleItem(event: any, element: any){
    let target: any = event.target || event.srcElement || event.currentTarget
    let idAttr = target.attributes.id
    let id = idAttr.nodeValue
    this.userService.DeleteItemFromCard(id).subscribe()
    // this.cart = this.userService.getCart()
    // console.log(this.cart)
    this.cart.splice(element,1)
    this.userService.getCart().splice(element,1)
    // this.cart.forEach((element,index) => {
    //   if(element.id == id)
    //     this.cart.splice(index)
    // })
    console.log(this.cart)
  }
  back(){
    this.router.navigate([''])
  }
}
