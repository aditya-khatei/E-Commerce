import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { WishlistModalComponent } from './components/wishlist-modal/wishlist-modal.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { QuickViewModalComponent } from './components/quick-view-modal/quick-view-modal.component';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FiltersComponent,
    ProductListComponent,
    ProductCardComponent,
    CartModalComponent,
    WishlistModalComponent,
    ProfileModalComponent,
    ToastComponent,
    QuickViewModalComponent,
    CheckoutModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
