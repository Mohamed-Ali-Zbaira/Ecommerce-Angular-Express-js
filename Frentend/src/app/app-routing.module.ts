import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceComponent } from './shopping-cart/ecommerce/ecommerce.component';

const routes: Routes = [
  { path: 'ecommerce', component: EcommerceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
