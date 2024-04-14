import { Items } from './../../interfaces/items';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  @Input() categoryItems!: Category;

  constructor(private userService: UserService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.userService.getIsLogin()){
      // this.fillCart()
    }
  }

  fillCart(){
    // if (this.userService.getIsLogin()){
    //   this.userService.getCart().splice(0)
    //   this.userService.getCartItemsbyUser(this.userService.getUser().id)
    //     .subscribe(carts => {
    //       this.userService.setCartCount(carts.length)
    //       carts.forEach(cart => {
    //         this.userService.setCart(cart)
    //       })
    //     })
    // }
  }

}
