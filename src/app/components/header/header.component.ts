import { Iuser } from './../../interfaces/iuser';
import { Items } from './../../interfaces/items';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: any;
  islogin!: boolean
  user!: Iuser

  constructor(private userService: UserService, ) {
   }

  ngOnInit(): void {
    this.islogin = JSON.parse(localStorage.getItem('isLogin')|| "")
    this.user = this.userService.getUser()
    this.userService.getAllCategories().subscribe(data => this.categories = data)
    // this.userService.getItemsList().subscribe(data => this.items = data)
  }


}
