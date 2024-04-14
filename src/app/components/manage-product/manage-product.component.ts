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

  catagories: Category[]=[]
  items: Items[] = []
  search:string=''
  // editForm:boolean=false
  itemForm!: FormGroup

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createForm()

    // firebase database
    this.items = this.userService.getItems();
    this.catagories = this.userService.getCatagories();
    this.catagories.forEach((catagory) => {
      this.items.forEach((item) => {
        if (item.categoryId === catagory.id){
          item.categoryName = catagory.categoryName;
        }
      });
    });

    // mysql database
    // this.userService.getAllCategoriesAdmin().subscribe(data =>{
    //   this.categories = data
    //   this.categories.forEach(category => {
    //     category.citem?.forEach(c => {
    //       this.items.push(c)
    //       this.items.forEach(item => {
    //         if (item.id == c.id){
    //           item.categoryId = category.id
    //           item.categoryName = category.categoryName
    //         }
    //       })
    //     })
    //   })
    // })
  }
  createForm(){
    this.itemForm = new FormGroup({
      id: new FormControl(),
      itemName: new FormControl(),
      price: new FormControl(),
      availableQty: new FormControl(),
      itemDescription: new FormControl(),
      categoryId: new FormControl(),
      image: new FormControl()
    })
  }

  fetchValue(index: any){
    let item: Items = this.items[index];
    if (!item.showEdit){
      item.showEdit = true;
      this.itemForm.patchValue({
        id: item.id,
        itemName: item.itemName,
        price: item.price,
        availableQty: item.availableQty,
        itemDescription: item.itemDescription,
        categoryId: item.categoryId,
        
        })
    }else {
      item.showEdit = false;
    }
  }

  disableItem(event: any, index: number){
    let item = this.items[index];
    let checked = event.target.checked   
    item.disabled = checked

    this.userService.updatefirebaseCatagoryItm(item)    

    // mysql database
    // let checked = event.target.checked   
    // this.items[index].disabled = checked
    // this.userService.updateCategoryItm(this.items[index]).subscribe()
  }

  addItem(){
    this.router.navigate(['product/add'])    
  }

  submit(){
    let index: number = this.items.findIndex( item => item.id == this.itemForm.value['id'])

    // firebase database
    this.items[index].itemDescription = this.itemForm.value['itemDescription'];
    this.items[index].itemName = this.itemForm.value['itemName'];
    this.items[index].price = this.itemForm.value['price'];
    this.items[index].availableQty = this.itemForm.value['availableQty'];
    this.items[index].categoryId = this.itemForm.value['categoryId']
    this.userService.updatefirebaseCatagoryItm(this.items[index])

    // mysql database
    // this.userService.updateCategoryItm(this.itemForm.value).subscribe()
  }
}
