import { Items } from './interfaces/items';
import { UserService } from './services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
    localStorage.setItem('isLogin', 'false')
    localStorage.setItem('uid','')
    localStorage.setItem('uname', '')
    localStorage.setItem('uemail', '')
    localStorage.setItem('role', '')
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
