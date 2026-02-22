import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.css']
})
export class CheckoutModalComponent implements OnInit {
  isOpen$!: Observable<boolean>;
  step = 1; // 1: Shipping, 2: Payment, 3: Success

  // Form Data
  shipping = { name: '', address: '', city: '' };
  payment = { card: '', expiry: '', cvv: '' };

  constructor(
    private modalService: ModalService,
    private cartService: CartService,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this.modalService.checkoutOpen$;
    this.userService.profile$.subscribe(p => {
      if (p) this.shipping.name = p.name;
    });
  }

  close() {
    this.modalService.closeCheckout();
    setTimeout(() => this.step = 1, 300); // Reset step after closing animation
  }

  nextStep() {
    if (this.step === 1) {
      if (!this.shipping.name || !this.shipping.address || !this.shipping.city) {
        this.toastService.show('error', 'Required Fields', 'Please fill in all shipping details.');
        return;
      }
      this.step = 2;
    } else if (this.step === 2) {
      if (!this.payment.card || !this.payment.expiry || !this.payment.cvv) {
        this.toastService.show('error', 'Required Fields', 'Please fill in all payment details.');
        return;
      }
      this.processOrder();
    }
  }

  prevStep() {
    this.step--;
  }

  processOrder() {
    // Generate Fake Order
    let total = 0;
    let itemsCount = 0;
    this.cartService.cart$.subscribe(items => {
      itemsCount = items.reduce((sum, item) => sum + item.qty, 0);
    }).unsubscribe();

    this.cartService.cartTotal$.subscribe(t => total = t).unsubscribe();

    this.userService.addOrder(total, itemsCount);
    this.cartService.clearCart();
    this.step = 3; // Success state
  }
}
