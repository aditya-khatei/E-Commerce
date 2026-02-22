import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-quick-view-modal',
  templateUrl: './quick-view-modal.component.html',
  styleUrls: ['./quick-view-modal.component.css']
})
export class QuickViewModalComponent implements OnInit {
  isOpen$!: Observable<boolean>;
  product$!: Observable<Product | null>;
  quantity = 1;

  constructor(
    private modalService: ModalService,
    private cartService: CartService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this.modalService.quickViewOpen$;
    this.product$ = this.modalService.activeProduct$;
  }

  close() {
    this.modalService.closeQuickView();
    setTimeout(() => this.quantity = 1, 300);
  }

  changeQty(delta: number) {
    this.quantity += delta;
    if (this.quantity < 1) this.quantity = 1;
  }

  addToCart(product: Product) {
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addToCart(product);
    }
    this.toastService.show('success', 'Added to Cart', `${this.quantity}x ${product.name} added to cart.`);
    this.close();
  }
}
