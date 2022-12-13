import { NavidationGuard } from './gaurd/navidation.guard';
import { ManageItemsComponent } from './components/manage-items/manage-items.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'manage/product', component: ManageProductComponent},
  {path: 'product/add', component: ManageItemsComponent},
  {path: 'cart/show', component: CartComponent},
  {path: '', component: HeaderComponent,
    children:[
      {path: '', component: ItemsComponent},
      {path: 'productview', component: ItemsComponent},
      {path: ':id', component: ItemDetailsComponent},
    ]},
  
  // {path: '', component: ItemsComponent},
  // {path: 'signup', component: SignupComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'header', component: HeaderComponent},
  // {path: 'productview', component: ItemsComponent},
  // {path: 'manage/product', component: ManageProductComponent},
  // {path: 'product/add', component: ManageItemsComponent},
  // {path: ':id', component: ItemDetailsComponent},
  // {path: 'cart/show', component: CartComponent},
  // {path: 'categoryitem/delete/'+':id',component: CartComponent},
  
  {path: '**', redirectTo: 'foodbox', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
