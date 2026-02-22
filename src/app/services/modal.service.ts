import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private profileOpen = new BehaviorSubject<boolean>(false);
    profileOpen$ = this.profileOpen.asObservable();

    private cartOpen = new BehaviorSubject<boolean>(false);
    cartOpen$ = this.cartOpen.asObservable();

    private wishlistOpen = new BehaviorSubject<boolean>(false);
    wishlistOpen$ = this.wishlistOpen.asObservable();

    private checkoutOpen = new BehaviorSubject<boolean>(false);
    checkoutOpen$ = this.checkoutOpen.asObservable();

    private quickViewOpen = new BehaviorSubject<boolean>(false);
    quickViewOpen$ = this.quickViewOpen.asObservable();

    private activeProduct = new BehaviorSubject<any>(null);
    activeProduct$ = this.activeProduct.asObservable();

    toggleProfile() { this.profileOpen.next(!this.profileOpen.value); }
    closeProfile() { this.profileOpen.next(false); }

    toggleCart() { this.cartOpen.next(!this.cartOpen.value); }
    closeCart() { this.cartOpen.next(false); }

    toggleWishlist() { this.wishlistOpen.next(!this.wishlistOpen.value); }
    closeWishlist() { this.wishlistOpen.next(false); }

    openCheckout() { this.checkoutOpen.next(true); }
    closeCheckout() { this.checkoutOpen.next(false); }

    openQuickView(product: any) {
        this.activeProduct.next(product);
        this.quickViewOpen.next(true);
    }
    closeQuickView() {
        this.quickViewOpen.next(false);
        setTimeout(() => this.activeProduct.next(null), 300);
    }
}
