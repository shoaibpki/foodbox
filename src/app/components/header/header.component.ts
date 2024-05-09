import { Router } from '@angular/router';
import { Iuser } from './../../interfaces/iuser';
import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { cartCounterState, cartState, fadeEffectState, slideRightDefault} from 'src/app/animations';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    fadeEffectState,
    cartState,
    cartCounterState,
    slideRightDefault
  ]
})
export class HeaderComponent implements OnInit, OnDestroy{

  @HostBinding('@fadeEffect') fadeEffect= true
  @ViewChild('fixedPosition') fixedPositioned!: ElementRef<HTMLSelectElement>
  catagories: Category[]=[];
  user: Iuser = {} as Iuser;
  role: string =''
  cartCount:number =0;

  constructor(private userService: UserService, private router: Router ) {
   }
  
  ngOnInit(): void {

    // firebase database
    this.catagories = this.userService.getFirebaseCatagories();


    // mysql database
    // this.user = this.userService.getUser()
    // this.userService.getAllCategories().subscribe(data => this.catagories = data)
    this.userService.cartChanged.subscribe((count) => {
      this.cartCount = count
    })
}

  islogin(){
    if (this.userService.getIsLogin()) {
      this.user = this.userService.getUser()
      this.role = this.user.role;
      if (this.role === 'CUSTOMER'){
        this.userService.setCartCount(this.userService.getCart.length)
        this.userService.getItems().forEach((item) =>  {
          this.userService.getCart.forEach((cart) => {
            if (item.id === cart.itemId){
              item.addCart = true
            }
          });
        });
      }
    }
    return this.userService.getIsLogin()
  }
  
  logout(){
    setTimeout(() => {
      this.userService.setIsLogin(false)
      // firebase database
      this.userService.logoutFireBaseUser();

      // mysql database
      // this.userService.getCart().splice(0, this.userService.getCart().length)
      // this.user = {} as Iuser
      // this.role=''
      // this.userService.setUser(this.user)
      this.userService.getItems().forEach(item => {
        item.addCart = false
      })
    }, 1000);
    this.router.navigate([''])
  }

  selecClassFixed(){
    if (window.innerWidth > 768){
      console.log(window.innerWidth)
      return 'position-fixed';
    }else {
      return '';
    }
  }
  
  ngOnDestroy(){
    // this.subs.unsubscribe()
  }
}
