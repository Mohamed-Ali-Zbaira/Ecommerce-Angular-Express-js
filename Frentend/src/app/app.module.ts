import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsRoutingModule } from './products/products-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './products/products.module';
import { RegisterComponent } from './authentification/register/register.component';
import { AuthentificationModule } from'./authentification/authentification.module';
import { FormsModule } from '@angular/forms'; 
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsRoutingModule,
    HttpClientModule,
    ProductsModule,
    AuthentificationModule,
    FormsModule,
    ShoppingCartModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
