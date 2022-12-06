import { UserService } from './../../services/user.service';
import { Items } from './../../interfaces/items';
import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items!: Array<Items>

  constructor(
    private userService: UserService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getItemsList().subscribe(data => this.items = data)
  }

}
