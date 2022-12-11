import { UserService } from './../../services/user.service';
import { Items } from './../../interfaces/items';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  items: Items[] = []
  search:string=''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.allItemsForAdmin().subscribe(data => this.items= data)
  }

}
