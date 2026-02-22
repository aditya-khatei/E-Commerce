import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Product[] = [];
  private wishlistSource = new BehaviorSubject<Product[]>([]);
  wishlist$ = this.wishlistSource.asObservable();

  constructor() {
    this.loadWishlist();
  }

  private loadWishlist() {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      this.wishlist = JSON.parse(saved);
      this.wishlistSource.next([...this.wishlist]);
    }
  }

  private saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this.wishlistSource.next([...this.wishlist]);
  }

  toggleWishlistItem(product: Product) {
    const exists = this.wishlist.some(w => w.id === product.id);
    if (exists) {
      this.wishlist = this.wishlist.filter(w => w.id !== product.id);
    } else {
      this.wishlist.push(product);
    }
    this.saveWishlist();
  }

  removeFromWishlist(id: number) {
    this.wishlist = this.wishlist.filter(item => item.id !== id);
    this.saveWishlist();
  }

  clearWishlist() {
    this.wishlist = [];
    this.saveWishlist();
  }

  isWishlisted(id: number): boolean {
    return this.wishlist.some(w => w.id === id);
  }
}
