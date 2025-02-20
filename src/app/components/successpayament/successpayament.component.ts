import { UserCredential } from 'firebase/auth';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-successpayament',
  templateUrl: './successpayament.component.html',
  styleUrls: ['./successpayament.component.css']
})
export class SuccesspayamentComponent {

  email: string ='';
  pass: string= '';
  constructor(
    private userService: UserService,
    private router: Router){}

  ngOnInit(){

    this.email = localStorage.getItem('email')!;
    this.pass = localStorage.getItem('password')!;
    this.getUser();
    this.payCart();
  }

  getUser(){
    // firebase database

    this.userService.loginFirebaseUser(this.email, this.pass)
      .then((userCredential) => {
        this.userService.setIsLogin(true);
        this.userService.loginMenu = false;
        this.userService.getFirebaseUser(userCredential.user.uid);
        this.userService.getFirebaseCartItems();
        setTimeout(() => {
          this.userService.paidFirebaseCart()
        }, 1000);
        this.userService.setCartCount(this.userService.getCart.length);
            // this.router.navigate(['productview']);
      });
  }

  payCart(){
    console.log(this.userService.getCart)
    // this.userService.paidFirebaseCart();
  }

}
