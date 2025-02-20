import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private userService: UserService,
    private router: Router){}

  ngOnInit(){
    if (this.userService.getIsLogin()){
      this.userService.setIsLogin(false)
      setTimeout(() => {
  
        // firebase database
        this.userService.logoutFireBaseUser();
  
        // mysql database
        // this.userService.getCart().splice(0, this.userService.getCart().length)
        // this.user = {} as Iuser
        // this.role=''
        // this.userService.setUser(this.user)
        this.userService.getItems().forEach(item => {
          item.addCart = false
        })
        this.router.navigate(['']);
        localStorage.removeItem('isLogin');
        localStorage.removeItem('uid');
        localStorage.removeItem('uname');
        localStorage.removeItem('uemail');
        localStorage.removeItem('role');
      
      }, 0);
    }

  }

}
