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

  categoryItems!: Array<Items>
  isLogin!: boolean
  textSearch: string=''

  cart: Cart ={"id":0, "price":0,"quantity":0,"userId":0,"itemId":0, "image":""}


  constructor(private userService: UserService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params => {
      this.userService.getCategoryById(+params['id']).subscribe({
        next: (cItems) => this.categoryItems = cItems
      })
    }))
  }

  addToCart(event: any){
    this.isLogin = JSON.parse(localStorage.getItem("isLogin")||"")
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
            this.cart.userId = JSON.parse(localStorage.getItem("uid") || "")
            this.userService.addToCard(this.cart).subscribe()
          }
        })
    }

  }
}
