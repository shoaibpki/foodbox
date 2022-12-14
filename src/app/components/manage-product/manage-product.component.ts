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

  items: Items[] = []
  search:string=''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.allItemsForAdmin().subscribe(data => data.forEach(item => {
      this.items.push(item)
    }))
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
  deleteItem(id:any){
    console.log("Deleting item with id: "+ id);
  }

}
