import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem extends Product {
  qty: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSource = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSource.asObservable();

  private cartTotalSource = new BehaviorSubject<number>(0);
  cartTotal$ = this.cartTotalSource.asObservable();

  private discount = 0;

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cart = JSON.parse(saved);
      this.updateCartState();
    }
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartState();
  }

  private updateCartState() {
    this.cartSource.next([...this.cart]);
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    this.cartTotalSource.next(Number((total - total * this.discount).toFixed(2)));
  }

  addToCart(product: Product) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      this.cart.push({ ...product, qty: 1 });
    }
    this.saveCart();
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.saveCart();
  }

  changeQty(id: number, delta: number) {
    const item = this.cart.find(p => p.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        this.removeFromCart(id);
      } else {
        this.saveCart();
      }
    }
  }

  clearCart() {
    this.cart = [];
    this.discount = 0;
    this.saveCart();
  }

  applyCoupon(code: string): boolean {
    if (code === 'SAVE10') {
      this.discount = 0.1;
      this.updateCartState();
      return true;
    }
    this.discount = 0;
    this.updateCartState();
    return false;
  }
}
