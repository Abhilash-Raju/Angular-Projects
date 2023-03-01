import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { HeadersComponent } from './components/headers/headers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { SellerComponent } from './components/seller/seller.component';
import { SellerAuthGuard } from './guards/seller-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'seller-auth',
    component:SellerComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[SellerAuthGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate:[SellerAuthGuard]
  },{
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent,
    canActivate:[SellerAuthGuard]
  },{
    path:'search/:query',
    component:SearchComponent,
    canActivate:[SellerAuthGuard]
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
