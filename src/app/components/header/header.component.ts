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
  myinterval: any

  constructor(private userService: UserService, private router: Router ) {
   }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.userService.getAllCategories().subscribe(data => this.categories = data)
  }

  islogin(){
    if (this.userService.getIsLogin()) {
      this.user = this.userService.getUser()
      this.role = this.user.role
    }
    return this.userService.getIsLogin()
  }

  logout(){
    setTimeout(() => {
      this.userService.setIsLogin(false)
      this.role = ''
      this.userService.getCart().splice(0, this.userService.getCart().length)
      this.user = {} as Iuser
      this.userService.setUser(this.user)
      this.userService.getItems().forEach(item => {
        item.addCart = false
      })
    }, 1000);
    this.router.navigate([''])
  }

}
