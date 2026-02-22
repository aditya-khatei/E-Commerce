import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private initialProducts: Product[] = [
    { id: 1, name: 'Premium Urban Sneakers', price: 89, category: 'clothing', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2hvZXN8fHx8fHwxNjQ1MDAyMTYx&ixlib=rb-1.2.1&q=80&w=1080' },
    { id: 2, name: 'Noise-Cancelling Headphones', price: 199, category: 'electronics', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aGVhZHBob25lc3x8fHx8fDE2NDUwMDIyMDg&ixlib=rb-1.2.1&q=80&w=1080' },
    { id: 3, name: 'Minimalist Leather Backpack', price: 120, category: 'accessories', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFja3BhY2t8fHx8fHwxNjQ1MDAyMjM5&ixlib=rb-1.2.1&q=80&w=1080' },
    { id: 4, name: 'Smart Watch Pro Series', price: 299, category: 'electronics', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2F0Y2h8fHx8fHwxNjQ1MDAyMjg1&ixlib=rb-1.2.1&q=80&w=1080' },
    { id: 5, name: 'Vintage Denim Jacket', price: 150, category: 'clothing', img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8amFja2V0fHx8fHx8MTY0NTAwMjMyNA&ixlib=rb-1.2.1&q=80&w=1080' },
    { id: 6, name: 'Classic Aviator Sunglasses', price: 75, category: 'accessories', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c3VuZ2xhc3Nlc3x8fHx8fDE2NDUwMDIzNjQ&ixlib=rb-1.2.1&q=80&w=1080' },

    // Furniture
    { id: 7, name: 'Mid-Century Velvet Armchair', price: 350, category: 'furniture', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXJtY2hhaXJ8fHx8fHwxNjQ1MDAyNDAw&ixlib=rb-1.2.1&q=80&w=1080' },
    { id: 8, name: 'Modern Wood Coffee Table', price: 180, category: 'furniture', img: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y29mZmVlIHRhYmxlfHx8fHx8MTY0NTAwMjQzNw&ixlib=rb-1.2.1&q=80&w=1080' },

    // Beauty
    { id: 9, name: 'Luxury Skincare Serum Set', price: 110, category: 'beauty', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2tpbmNhcmV8fHx8fHwxNjQ1MDAyNDcz&ixlib=rb-1.2.1&q=80&w=1080' },
    { id: 10, name: 'Signature Eau de Parfum', price: 135, category: 'beauty', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyZnVtZXx8fHx8fDE2NDUwMDI1MDM&ixlib=rb-1.2.1&q=80&w=1080' },

    // Sports
    { id: 11, name: 'Eco-Friendly Yoga Mat', price: 45, category: 'sports', img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8eW9nYSAgbWF0fHx8fHx8MTY0NTAwMjUzOQ&ixlib=rb-1.2.1&q=80&w=1080' },
    { id: 12, name: 'Adjustable Dumbbell Set', price: 160, category: 'sports', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZHVtYmJlbGxzfHx8fHx8MTY0NTAwMjU3NA&ixlib=rb-1.2.1&q=80&w=1080' }
  ];

  private productsSource = new BehaviorSubject<Product[]>(this.initialProducts);
  products$ = this.productsSource.asObservable();

  constructor() { }

  applyFilters(searchText: string, category: string, maxPrice: number, sort: string) {
    let filtered = [...this.initialProducts];

    if (searchText) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    filtered = filtered.filter(p => p.price <= maxPrice);

    if (sort === 'low-high') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'high-low') filtered.sort((a, b) => b.price - a.price);

    this.productsSource.next(filtered);
  }

  getProductById(id: number): Product | undefined {
    return this.initialProducts.find(p => p.id === id);
  }
}
