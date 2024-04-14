import { Category } from 'src/app/interfaces/category';
import { UserService } from './../../services/user.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() categories!: Category;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
