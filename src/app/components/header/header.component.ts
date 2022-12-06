import { Items } from './../../interfaces/items';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: any;

  constructor(private userService: UserService, ) { }

  ngOnInit(): void {
    localStorage.setItem('role', 'false')
    this.userService.getAllCategories().subscribe(data => this.categories = data)
    // this.userService.getItemsList().subscribe(data => this.items = data)
  }

}
