import { Category } from './../../interfaces/category';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { addCatagoryState } from 'src/app/animations';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {

  categories: Category[]=[]
  cmessage: string = ''
  cat: Category = {} as Category
  showCatagory: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  catsubmit(form: NgForm){
    this.cat.categoryName = form.value.catname

    // firebase database
    this.userService.addFirebaseCatagory(this.cat)
    form.reset()


    // mysql database
    // this.userService.saveCategory(this.cat).subscribe({
    //   next: data => data,
    //   error: err => this.cmessage = err['error'].text
    // })
  }

}
