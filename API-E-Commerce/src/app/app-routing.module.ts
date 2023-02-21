import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { HeadersComponent } from './components/headers/headers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SellerComponent } from './components/seller/seller.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'seller',
    component:SellerComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
