import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ToastService } from '../../services/toast.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  isWishlisted$!: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toastService: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.isWishlisted$ = this.wishlistService.wishlist$.pipe(
      map(items => items.some(w => w.id === this.product.id))
    );
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.toastService.show('success', 'Added to Cart', `${this.product.name} is now in your cart.`);

    // Trigger bounce animation on cart heart/icon
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.classList.add('bounce');
      setTimeout(() => cartBtn.classList.remove('bounce'), 300);
    }
  }

  toggleWishlist(event: Event) {
    event.stopPropagation(); // prevent opening quick view
    this.wishlistService.toggleWishlistItem(this.product);
  }

  openQuickView() {
    this.modalService.openQuickView(this.product);
  }
}
