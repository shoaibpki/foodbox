import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from './../../interfaces/category';
import { UserService } from './../../services/user.service';
import { Items } from './../../interfaces/items';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { fadeEffectState, modalEffectState, showMsgState } from 'src/app/animations';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
  animations: [
    fadeEffectState,
    showMsgState,
    modalEffectState
  ]
})
export class ManageProductComponent implements OnInit {

  @HostBinding('@fadeEffect') dEffect=true;

  showModal: boolean  = false;
  catagories: Category[]=[]
  items: Items[] = []
  search:string=''
  spinner:boolean=false
  itemForm!: FormGroup
  showMsg: string = '';
  @ViewChild('btnSave') saveBtn!: ElementRef<HTMLSelectElement>;

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
      itemName: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      availableQty: new FormControl(null, Validators.required),
      itemDescription: new FormControl(null, Validators.required),
      categoryId: new FormControl(),
      image: new FormControl()
    })
  }

  fetchValue(index: any){
    this.showModal = true
    let item: Items = this.items[index];
    this.saveBtn.nativeElement.disabled = false;
    this.itemForm.patchValue({
      id: item.id,
      itemName: item.itemName,
      price: item.price,
      availableQty: item.availableQty,
      itemDescription: item.itemDescription,
      categoryId: item.categoryId,  
    })
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
    this.saveBtn.nativeElement.disabled = true
    this.spinner = true

    // firebase database
    this.items[index].itemDescription = this.itemForm.value['itemDescription'];
    this.items[index].itemName = this.itemForm.value['itemName'];
    this.items[index].price = this.itemForm.value['price'];
    this.items[index].availableQty = this.itemForm.value['availableQty'];
    this.items[index].categoryId = this.itemForm.value['categoryId']

    setTimeout(() => {
      this.userService.updatefirebaseCatagoryItm(this.items[index])
      this.showMsg = 'Successfully Saved product!';
      this.spinner = false; 
    }, 3000);
    

    // mysql database
    // this.userService.updateCategoryItm(this.itemForm.value).subscribe()
  }

  closedMsg(){
    this.showModal = false;
    this.showMsg = ''
  }
}
