import { UserService } from './../../services/user.service';
import { Iuser } from './../../interfaces/iuser';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { cartCounterState, cartState, fadeEffectState, showMsgState, validationState } from 'src/app/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    fadeEffectState,
    validationState,
    showMsgState
  ]
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup
  user!: Iuser
  rUser!: any
  errorMsg: string=''
  strongPassword: RegExp = /[!@#$%^&*]/;
  showSpinner: boolean = false;
  @ViewChild('btnSubmit') submitBtn!: ElementRef<HTMLSelectElement>;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required, 
        Validators.minLength(6),
        Validators.pattern(this.strongPassword)
      ])
    })
  }

  get name(){
    return this.userForm.get('name');
  }

  get password(){
    return this.userForm.get('password');
  }

  submit(){
    this.showSpinner = true;
    this.submitBtn.nativeElement.disabled = true;
    setTimeout(() => {
      this.user = this.userForm.value;
      this.user.role="CUSTOMER";
      this.userService.registerFirebaseUser(this.user.email, this.user.password)
      .then((userCredential) => {
        this.userService.addFirebaseUser(userCredential.user.uid, this.user)
        this.showSpinner = false;      
        this.errorMsg = "Register Successfully!"
        this.userForm.reset()
      })
      .catch((error) => {
        console.log(error)
        this.showSpinner = false;      
        this.userForm.reset()
        this.errorMsg = error
      })
    }, 3000);
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
  closedMsg(){
    this.errorMsg = ''
  }
}
