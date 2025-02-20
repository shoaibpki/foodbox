import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancelledpayment',
  templateUrl: './cancelledpayment.component.html',
  styleUrls: ['./cancelledpayment.component.css']
})
export class CancelledpaymentComponent {

    email: string ='';
    pass: string= '';
    constructor(
      private userService: UserService,
      private router: Router){}
  
    ngOnInit(){
  
      this.email = localStorage.getItem('email')!
      this.pass = localStorage.getItem('password')!
    }
  
    getUser(){
      this.userService.loginFirebaseUser(this.email, this.pass)
        .then((userCredential) => {
          this.userService.setIsLogin(true);
          this.userService.getFirebaseUser(userCredential.user.uid);
          this.userService.getFirebaseCartItems();
          this.userService.loginMenu = false;
          this.router.navigate(['productview']);
        })
    }

}
