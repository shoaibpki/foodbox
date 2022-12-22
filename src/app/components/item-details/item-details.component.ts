import { Cart } from './../../interfaces/cart';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { Items } from 'src/app/interfaces/items';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  categoryItems!: Items[]
  isLogin!: boolean
  textSearch: string=''
  carts: Cart[] =[]
  cart: Cart = {} as Cart


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
    console.log(this.userService.getCart())
    this.activatedRoute.params.subscribe((params => {
      this.userService.getCategoryById(+params['id']).subscribe({
        next: (cItems) => {
          this.categoryItems = cItems
          if (this.userService.getCart().length != 0 ){
            this.categoryItems.forEach(item => {
              item.cartItems?.forEach(cart => {
                this.userService.getCart().forEach(ucart => {
                  if(ucart.id == cart.id ){
                    console.log(cart.id)
                    item.addCart = true
                  }
                })
              })
            }) 
          }
        }
      })
    }))
  }

  addToCart(event: any, i: any){
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
              this.categoryItems[i].addCart = true
            }
          })
      }
  }

  removFromCart(event: any, i:any){
    this.categoryItems[i].cartItems?.forEach(ci => {
      this.userService.getCart().forEach(cart => {
        if (cart.id == ci.id){
          this.userService.DeleteItemFromCard(cart.id).subscribe()
        }
      })
    })
    this.categoryItems[i].addCart=false  
  }

  fillCart(){
    this.carts.splice(0, this.carts.length)
    this.userService.getCartItemsbyUser(this.userService.getUser().id)
    .subscribe(carts => carts.forEach(cart => {
      this.carts.push(cart)
    }))
    console.log(this.carts)
  }

}
