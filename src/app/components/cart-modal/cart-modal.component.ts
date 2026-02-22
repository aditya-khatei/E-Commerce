import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../../services/cart.service';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  cartTotal$!: Observable<number>;
  isOpen$!: Observable<boolean>;
  couponCode = '';

  constructor(
    private cartService: CartService,
    private modalService: ModalService,
    private userService: UserService,
    private toastService: ToastService // Added ToastService to constructor
  ) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cart$;
    this.cartTotal$ = this.cartService.cartTotal$;
    this.isOpen$ = this.modalService.cartOpen$;
  }

  close() {
    this.modalService.closeCart();
  }

  changeQty(id: number, delta: number) {
    this.cartService.changeQty(id, delta);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  applyCoupon() {
    if (this.cartService.applyCoupon(this.couponCode)) {
      this.toastService.show('success', 'Coupon Applied!', 'Enjoy your 10% discount.');
    } else {
      this.toastService.show('error', 'Invalid Coupon', 'The code you entered is invalid.');
    }
  }

  clear() {
    if (confirm("Are you sure to remove all items from the cart?")) {
      this.cartService.clearCart();
    }
  }

  checkout(total: number) {
    if (total <= 0) {
      this.toastService.show('error', 'Empty Cart', 'Add some products first!');
      return;
    }

    // Open dummy checkout flow instead of immediate pass
    this.close();
    this.modalService.openCheckout();
  }
}
