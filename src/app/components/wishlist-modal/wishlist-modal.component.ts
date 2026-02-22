import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-wishlist-modal',
  templateUrl: './wishlist-modal.component.html',
  styleUrls: ['./wishlist-modal.component.css']
})
export class WishlistModalComponent implements OnInit {
  wishlist$!: Observable<Product[]>;
  isOpen$!: Observable<boolean>;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.wishlist$ = this.wishlistService.wishlist$;
    this.isOpen$ = this.modalService.wishlistOpen$;
  }

  close() {
    this.modalService.closeWishlist();
  }

  removeItem(id: number) {
    this.wishlistService.removeFromWishlist(id);
  }

  moveToCart(product: Product) {
    this.cartService.addToCart(product);
    this.wishlistService.removeFromWishlist(product.id);
  }

  clear() {
    if (confirm("Are you sure to remove all items from the wishlist?")) {
      this.wishlistService.clearWishlist();
    }
  }
}
