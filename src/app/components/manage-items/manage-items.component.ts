import { Items } from 'src/app/interfaces/items';
import { Category } from './../../interfaces/category';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { addCatagoryState, catagoryItemSlideState, showMsgState } from 'src/app/animations';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css'],
  animations: [
    addCatagoryState,
    catagoryItemSlideState,
    showMsgState
  ]

})
export class ManageItemsComponent implements OnInit {

  userForm!: FormGroup
  categories: Category[]=[]
  items! : Items
  message: string = ''
  showCatagory: boolean = false;
  minusIcon = false
// validators 
  get itemName() {return this.userForm.get('itemName')}
  get categoryId() {return this.userForm.get('categoryId')}
  get price() {return this.userForm.get('price')}
  get availableQty() { return this.userForm.get('availableQty')}
  get itemDescription(){ return this.userForm.get('itemDescription') }
  get image() { return this.userForm.get('image') }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.createForm()
    this.getCategory()
    }

  createForm(){
    this.userForm = new FormGroup({
      itemName: new FormControl('',Validators.required),
      itemDescription: new FormControl('',Validators.required),
      categoryId: new FormControl('',Validators.required),
      image: new FormControl('', Validators.required),
      price: new FormControl(0,Validators.required),
      availableQty: new FormControl(0,[Validators.required]),
      disabled: new FormControl(false)
    })
  }
  
  getCategory(){
    // firebase database
    this.categories = this.userService.getFirebaseCatagories();

    // mysql database
    // this.userService.getAllCategoriesAdmin().subscribe(data => this.categories = data)
  }
  
  submit(form: any){

    if(this.userForm.valid){
      let fullPath: string = this.userForm.value['image']
      if (fullPath != '') {
        let filename = fullPath.split('\\').pop()
        this.userForm.value['image'] = filename
      }
      this.userService.addFirebaseCatagoryItem(form)
      this.message = 'Add Product Successfully';
      this.userService.getItems().push(this.userForm.value)
      this.reset();
      // this.items = this.userForm.value

      // this.userService.saveCategoryItm(this.items).subscribe({
      //   next: data => this.message = data,
      //   error: err => this.message = err['error'].text
      // })
    }
  }

  reset(){
    this.userForm.reset()
    this.message = ''
  }

  afterShow(){
    if (!this.minusIcon){
      this.minusIcon = true;
    }else{
      this.minusIcon = false;
    }
  }
  closedMsg(){
    this.message = ''
  }

}
