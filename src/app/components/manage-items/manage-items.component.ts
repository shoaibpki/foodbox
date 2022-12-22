import { Items } from 'src/app/interfaces/items';
import { Category } from './../../interfaces/category';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css']
})
export class ManageItemsComponent implements OnInit {

  userForm!: FormGroup
  categories: Category[]=[]
  items!: Items
  message: string = ''

  get itemName() {return this.userForm.get('itemName')}
  get categoryId() {return this.userForm.get('categoryId')}
  get price() {return this.userForm.get('price')}
  get availableQty() { return this.userForm.get('availableQty')}
  get itemDescription(){ return this.userForm.get('itemDescription') }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      itemName: new FormControl('',[
        Validators.required
      ]),
      itemDescription: new FormControl('',[
        Validators.required
      ]),
      categoryId: new FormControl('',[
        Validators.required
      ]),
      image: new FormControl(''),
      price: new FormControl(0,[
        Validators.required
      ]),
      availableQty: new FormControl(0,[
        Validators.required
      ]),
      disabled: new FormControl(false)
    })
    this.getCategory()
    }
  
  getCategory(){
    // this.categories.splice(0, this.categories.length)
    this.userService.getAllCategoriesAdmin().subscribe(data => this.categories = data)
  }
  
  submit(){

    if(this.userForm.valid){
      let fullPath: string = this.userForm.value['image']
      if (fullPath != '') {
        let filename = fullPath.split('\\').pop()
        this.userForm.value['image'] = filename
      }
      this.items = this.userForm.value
      this.userService.saveCategoryItm(this.items).subscribe({
        next: data => this.message = data,
        error: err => this.message = err['error'].text
      })
    }
  }

  reset(){
    this.userForm.reset()
    this.message = ''
  }

}
