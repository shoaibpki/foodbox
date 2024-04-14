import { UserService } from './../../services/user.service';
import { Iuser } from './../../interfaces/iuser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validatePassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup
  user!: Iuser
  rUser!: any
  errorMsg: string=''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(null, Validators.minLength(6))
    })
  }

  submit(){
    this.user = this.userForm.value

    this.user.role="CUSTOMER"
    this.userService.registerFirebaseUser(this.user.email, this.user.password)
    .then((userCredential) => {
      this.userService.addFirebaseUser(userCredential.user.uid, this.user)
      this.errorMsg = "Register Successfully!"
      this.userForm.reset()
    })
    .catch((error) => {
      console.log(error)
      this.errorMsg = error.message
    })
    // mysql database
    // this.userService.signupUser(this.user)
    //   .subscribe({
    //     next: data => this.rUser = data,
    //     error: err => this.error = err.message
    //   })   
    // if (this.rUser) {
    //   this.errorMsg = "Register Successfully!"
    // }
  }
}
