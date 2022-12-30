import { Router, NavigationExtras } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Iuser } from './../../interfaces/iuser';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string=''
  email!: string
  userForm!: FormGroup
  user!: Iuser

  constructor(private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  submit(){
    this.userService.getLogin(this.userForm.value['email'],
      this.userForm.value['password']).subscribe({
        next: data => { console.log("data") },
        error: err =>{
          this.email = err['error'].text
          this.error =  err['error'].msg
          if (this.email == this.userForm.value['email']){
            this.userService.getUserByEmail(this.email)
              .subscribe({
                next: data =>{
                  this.userService.setUser(data);
                  this.user = this.userService.getUser();
                  this.userService.setIsLogin(true)
                  // this.userForm.reset()
                  this.router.navigate(['']);
                },
                error: err =>console.log(err)
              })
          }
        } 
      })

  }
}
