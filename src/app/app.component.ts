import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from 'fireBaseSetting';
import { initializeApp } from "firebase/app"
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService){
    localStorage.setItem('isLogin', 'false');
    localStorage.setItem('uid','');
    localStorage.setItem('uname', '');
    localStorage.setItem('uemail', '');
    localStorage.setItem('role', '');
    initializeApp(firebaseConfig);
  }

  ngOnInit(){
    this.userService.getFirebaseCatagoryItems();
  }
 

  // categories!: any
  // items!: Array<Items>
  // constructor(private userService: UserService) { }

  // ngOnInit(): void {
  //   localStorage.setItem('role', 'false')
  //   this.userService.getAllCategories().subscribe(data => this.categories = data)
  //   this.userService.getItemsList().subscribe(data => this.items = data)
  // }


  title = 'foodboxFE';
}
