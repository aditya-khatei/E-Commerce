import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  isLoading = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Simulate network delay to exhibit the shimmer skeleton loader
    setTimeout(() => {
      this.products$ = this.productService.products$;
      this.isLoading = false;
    }, 800);
  }
}
