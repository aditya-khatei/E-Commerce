import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ThemeService } from '../../services/theme.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount$!: Observable<number>;
  wishlistCount$!: Observable<number>;
  isDark$!: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private themeService: ThemeService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.cartCount$ = this.cartService.cart$.pipe(
      map(items => items.reduce((acc, curr) => acc + curr.qty, 0))
    );
    this.wishlistCount$ = this.wishlistService.wishlist$.pipe(
      map(items => items.length)
    );
    this.isDark$ = this.themeService.isDark$;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleProfile() {
    this.modalService.toggleProfile();
  }

  toggleWishlist() {
    this.modalService.toggleWishlist();
  }

  toggleCart() {
    this.modalService.toggleCart();
  }
}
