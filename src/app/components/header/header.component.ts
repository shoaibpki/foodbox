import { Cart } from './../../interfaces/cart';
import { Router } from '@angular/router';
import { Iuser } from './../../interfaces/iuser';
import { Items } from './../../interfaces/items';
import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  categories: any;
  user!: Iuser
  role: string =''
  cartCount!:number
  subs!: Subscription
  constructor(private userService: UserService, private router: Router ) {
   }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.userService.getAllCategories().subscribe(data => this.categories = data)
  }

  islogin(){
    if (this.userService.getIsLogin()) {
      this.user = this.userService.getUser()
      this.role = this.user.role
      this.subs = this.userService.cartChanged.subscribe(count => this.cartCount = count)
    }
    return this.userService.getIsLogin()
  }
  
  logout(){
    setTimeout(() => {
      this.userService.setIsLogin(false)
      this.userService.getCart().splice(0, this.userService.getCart().length)
      this.user = {} as Iuser
      this.userService.setUser(this.user)
      this.userService.getItems().forEach(item => {
        item.addCart = false
      })
    }, 1000);
    this.router.navigate([''])
  }
  
  ngOnDestroy(){
    // this.subs.unsubscribe()
  }
}
