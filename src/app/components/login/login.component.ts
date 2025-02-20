import { Router, NavigationExtras } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Iuser } from './../../interfaces/iuser';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { showMsgState } from 'src/app/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    showMsgState
  ]
})
export class LoginComponent implements OnInit {

  error: string=''
  email!: string
  userForm!: FormGroup
  user!: Iuser
  showSpinner: boolean = false;
  @ViewChild('onClickDisabled') clickDisabled!: ElementRef<HTMLSelectElement>

  constructor(private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  mainPage(){
    this.userService.loginMenu = false;
    this.router.navigate(['']);
  }

  reset(){
    this.userForm.reset();
    this.error = '';
  }
  submit(){

    let email = this.userForm.value['email'];
    let password = this.userForm.value['password'];
    this.showSpinner = true;
    this.clickDisabled.nativeElement.disabled = true;
    setTimeout(() => {
      this.showSpinner = false
      if (email === 'admin@abc.com' && password === '123'){
        this.userService.setUser({
          id: 0,
          name: 'admin',
          role: 'ADMIN',
          password: '',
          email: 'admin@abc.com'
        });
        this.userService.setIsLogin(true)
        this.router.navigate(['productview']);
      } else {
        // firebase database
        this.userService.loginFirebaseUser(email,password)
          .then((userCredential) => {
            this.userService.setIsLogin(true)
            this.userService.getFirebaseUser(userCredential.user.uid);
            this.userService.getFirebaseCartItems();
            this.userService.loginMenu = false;
            this.router.navigate(['productview']);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);        
          })
          .catch((error) => {
            this.clickDisabled.nativeElement.disabled = false;
            this.error = 'Username or Password not found!'
            console.log(error)
          })
      }      
    }, 3000);
    // mysql database...
    // this.userService.getLogin(this.userForm.value['email'],
    //   this.userForm.value['password']).subscribe({
    //     next: data => { console.log("data") },
    //     error: err =>{
    //       this.email = err['error'].text
    //       this.error =  err['error'].msg
    //       if (this.email == this.userForm.value['email']){
    //         this.userService.getUserByEmail(this.email)
    //           .subscribe({
    //             next: data =>{
    //               this.userService.setUser(data);
    //               this.user = this.userService.getUser();
    //               this.userService.setIsLogin(true)
    //               // this.userForm.reset()
    //               this.router.navigate(['']);
    //             },
    //             error: err =>console.log(err)
    //           })
    //       }
    //     } 
    //   })

  }
}
