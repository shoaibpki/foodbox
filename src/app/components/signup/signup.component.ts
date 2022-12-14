import { UserService } from './../../services/user.service';
import { Iuser } from './../../interfaces/iuser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup
  user!: Iuser
  rUser!: any
  error: string=''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
  }

  submit(){
    this.user = this.userForm.value
    this.user.role="USER"
    this.userService.signupUser(this.user)
      .subscribe({
        next: data => this.rUser = data,
        error: err => this.error = "User Already exist with this Email"
      })
    
    if (this.rUser) {
      this.error = "Register Successfully!"
    }
    this.router.navigate(['']);
  }
}
