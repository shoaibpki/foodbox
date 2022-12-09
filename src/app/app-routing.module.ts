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

  {path: '', component: ItemsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'productview', component: ItemsComponent},
  {path: 'cart/show', component: CartComponent},
  // {path: 'categoryitem/delete/'+':id',component: CartComponent},
  {path: 'header', component: HeaderComponent},
  {path: ':id', component: ItemDetailsComponent},
  {path: '**', redirectTo: 'foodbox', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
