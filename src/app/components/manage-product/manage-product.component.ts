import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from './../../interfaces/category';
import { UserService } from './../../services/user.service';
import { Items } from './../../interfaces/items';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  categories: Category[]=[]
  items: Items[] = []
  search:string=''
  editForm:boolean=false
  itemForm!: FormGroup
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      id: new FormControl(),
      itemName: new FormControl(),
      price: new FormControl(),
      availableQty: new FormControl(),
      itemDescription: new FormControl(),
      categoryId: new FormControl(),
      image: new FormControl()
    })

    this.userService.getAllCategoriesAdmin().subscribe(data =>{
      this.categories = data
      this.categories.forEach(category => {
        category.citem?.forEach((c,i) => {
          this.items.push(c)
          this.items.forEach(item => {
            if (item.id == c.id){
              item.categoryId = category.id
              item.categoryName = category.categoryName
            }
          })
        })
      })
    })
    

  }

  disableItem(event: any, index: number){
    
    let checked = event.target.checked
    
    this.items[index].disabled = checked
    console.log(this.items[index])
    this.userService.updateCategoryItm(this.items[index]).subscribe()
  }

  addItem(){
    this.router.navigate(['product/add'])    
  }

  submit(){
    let index: number = this.items.findIndex( item => item.id == this.itemForm.value['id'])
    console.log(this.items[index])

    this.userService.updateCategoryItm(this.itemForm.value).subscribe()
  }

}
