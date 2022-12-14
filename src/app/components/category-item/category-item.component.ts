import { Items } from './../../interfaces/items';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  @Input() categoryItems!: any

  constructor(private userService: UserService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
  }

}
