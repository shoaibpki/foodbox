import { Iuser } from './../../interfaces/iuser';
import { Cart } from './../../interfaces/cart';
import { UserService } from './../../services/user.service';
import { Items } from './../../interfaces/items';
import { Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items!: Items[]
  cart: Cart ={"id":0, "price":0,"quantity":0,"userId":0,"itemId":0, "image":""}
  user!: Iuser

  textSearch: string=''
  isLogin!: boolean

  constructor(
    private userService: UserService, 
    private route: Router) { }

  ngOnInit(): void {
    this.userService.getItemsList()
      .subscribe({
        next: data => {
          this.userService.setItems(data)
          this.items = this.userService.getItems()
        }
      }) 
    // console.log(this.userService.getItems())
  }

  addToCart(event: any){
    this.isLogin = this.userService.getIsLogin()
    let target: any = event.target || event.srcElement || event.currentTarget
    let idAttr = target.attributes.id
    let id = idAttr.nodeValue
    if (!this.isLogin) {
      alert('Please Login first')
      return
    } else {
        this.user = this.userService.getUser()
        this.userService.getCategoryItemById(id)
          .subscribe({
            next: data => {
              this.cart.itemId = data.id
              this.cart.price = data.price
              this.cart.image = data.image
              this.cart.quantity = 1
              this.cart.userId = this.user.id
              this.userService.addToCard(this.cart).subscribe()
            }
          })
      }
    // this.route.navigate(['cart/show'])
  }

}
