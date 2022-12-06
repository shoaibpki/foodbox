import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: HeaderComponent},

  {path: '', component: HeaderComponent,
  children:[
      {path: ':id', component: ItemDetailsComponent},

    ]},
    {path: 'foodbox/productview', component: ItemsComponent},
    {path: '**', redirectTo: 'foodbox', pathMatch: 'full'},
  // {path: 'productview', component: ItemsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
