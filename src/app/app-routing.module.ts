import { CancelledpaymentComponent } from './cancelledpayment/cancelledpayment.component';
import { SuccesspayamentComponent } from './components/successpayament/successpayament.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NavidationGuard } from './gaurd/navidation.guard';
import { ManageItemsComponent } from './components/manage-items/manage-items.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemsComponent } from './components/items/items.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'stripe-successful-payment', component: SuccesspayamentComponent, canActivate: [AuthGuard]},
  {path: 'stripe-cancelled-payment', component: CancelledpaymentComponent, canActivate: [AuthGuard]},
  {path: 'manage/product', component: ManageProductComponent,
    canActivate: [NavidationGuard]},
  {path: 'product/add', component: ManageItemsComponent},
  {path: 'cart/show', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: '', component: HeaderComponent,
  children:[
    {path: 'productview', component: ItemsComponent},
    {path: ':id', component: ItemDetailsComponent},
    {path: '', component: ItemsComponent},
    ]},
  
  {path: '**', redirectTo: 'foodbox', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
