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
        next: data => console.log(data),
        error: err => this.error = err['error'].text
      })
    if (this.error == ''){
      this.userService.getUserByEmail(this.userForm.value['email'])
        .subscribe({
          next: data =>{
            this.userService.setUser(data);
            this.user = this.userService.getUser();
            this.userService.setIsLogin(true);
            this.router.navigate(['']);
          },
          error: err => alert(err)
        })
    }
    this.userForm.reset()
  }
  

}
