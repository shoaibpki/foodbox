import { Router } from '@angular/router';
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
  user!: Iuser
  role: string =''

  constructor(private userService: UserService, private router: Router ) {
   }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    // this.role = this.user.role
    this.userService.getAllCategories().subscribe(data => this.categories = data)
    // this.userService.getItemsList().subscribe(data => this.items = data)
  }

  islogin(){
    if (this.userService.getIsLogin()) {
      this.user = this.userService.getUser()
      this.role = this.user.role
    }
    return this.userService.getIsLogin()
  }

  logout(){
    this.userService.setIsLogin(false)
    this.router.navigate([''])
  }

}
