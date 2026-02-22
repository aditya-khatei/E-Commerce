import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  searchText = '';
  category = 'all';
  maxPrice = 500;
  sort = 'default';

  constructor(private productService: ProductService) { }

  onFilterChange() {
    this.productService.applyFilters(
      this.searchText,
      this.category,
      this.maxPrice,
      this.sort
    );
  }
}
