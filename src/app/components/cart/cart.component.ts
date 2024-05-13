import { Router } from '@angular/router';
import { Cart } from './../../interfaces/cart';
import { Iuser } from './../../interfaces/iuser';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { deleteRecordState } from 'src/app/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    deleteRecordState
  ]
})
export class CartComponent implements OnInit {

  user!: Iuser
  cart: Cart[] = []
  subtotal: number = 0
  cartItems: number = 0
  gtotal: number = 0
  pay: boolean= false
  userId!: number;

  constructor(private userService: UserService, private router: Router) {

   }

  ngOnInit(): void {
    this.user = this.userService.getUser()

    // firebase database
    this.cart = this.userService.getCart;
    this.cart.forEach((cart) => {
      cart.subtotal = cart.price * cart.quantity;
      this.gtotal = this.gtotal + cart.subtotal;
      cart.userId = this.user.$key
    })

    // mysql database
    // this.userId = this.user.id
    // this.userService.getCartItemsbyUser(this.userId)
    //   .pipe( map(data => {
    //     data.forEach((c,i) =>{
    //       this.cart.push(c)
    //       this.cart[i].subtotal = c.price * c.quantity
    //       this.gtotal = this.gtotal + (this.cart[i].subtotal ?? 0)
    //       // this.cart[i].userId = this.user.id
    //     })
    //   })).subscribe()
  }

  changeFn(event: any, i: number) { // i add firebase database

    // firebase database
    this.gtotal = this.gtotal - this.cart[i].subtotal!;
    this.cart[i].subtotal = this.cart[i].quantity * this.cart[i].price;
    this.gtotal = this.gtotal + this.cart[i].subtotal!
    this.userService.updateFirebaseCart(this.cart[i])


    // mysql database
    // let target: any = event.target || event.srcElement || event.currentTarget
    // let idAttr = target.attributes.id
    // let index: number= idAttr.nodeValue
    // this.gtotal = this.gtotal - (this.cart[index].subtotal ?? 0)
    // this.cart[index].quantity = event.target.value
    // this.cart[index].subtotal = event.target.value * this.cart[index].price;
    // this.gtotal = this.gtotal + (this.cart[index].subtotal ?? 0)

  }
  
  deleItem(event: any, index: any){
    let key = this.cart[index].$key;
    this.userService.removeFirebaseCartItem(key)
      .then(val => {
        console.log('Deleted Successfully!')
        this.userService.getItems().forEach((item) => {
          if(item.id === this.cart[index].itemId){
            item.addCart = false
          }
        })
        this.cart.splice(index,1);
      });

    // let target: any = event.target || event.srcElement || event.currentTarget
    // let idAttr = target.attributes.id
    // let id = idAttr.nodeValue
    // this.userService.DeleteItemFromCard(id).subscribe()
    this.gtotal = this.gtotal - (this.cart[index].subtotal ?? 0)
      
  }
  
  back(){
    this.router.navigate([''])
  }

  saveCart(){
    if (this.cart.length == 0) {
      this.router.navigate([''])
    }else{
      // firebase database
      this.userService.paidFirebaseCart()
      this.cart = this.userService.getCart;
      this.userService.setCartCount(this.userService.getCart.length);
      this.gtotal = 0;

      // mysql database
      // this.cart.forEach((c) => {
      //   // this.userService.updateCart(c).subscribe()
      //   this.userService.getCart().forEach(ucart => {
      //     if (c.id == ucart.id){
      //       ucart.quantity = c.quantity
      //       ucart.subtotal = c.subtotal
      //     }
      //   })
      // })
      // this.cart.splice(0)
      // this.gtotal = 0
      // this.pay = true
      // this.router.navigate(['/checkout'])
    }
  }
}
