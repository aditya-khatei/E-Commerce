import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Order {
  id: string;
  date: string;
  total: number;
  items: number;
}

export interface UserProfile {
  name: string;
  email: string;
  orders: Order[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private profileSource = new BehaviorSubject<UserProfile | null>(null);
  profile$ = this.profileSource.asObservable();

  constructor() {
    this.loadProfile();
  }

  private loadProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      this.profileSource.next(JSON.parse(saved));
    } else {
      this.profileSource.next({ name: '', email: '', orders: [] });
    }
  }

  saveProfile(profile: UserProfile) {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    this.profileSource.next(profile);
  }

  addOrder(total: number, items: number) {
    const current = this.profileSource.value;
    if (current) {
      const newOrder: Order = {
        id: 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        date: new Date().toLocaleDateString(),
        total: total,
        items: items
      };
      current.orders = current.orders || [];
      current.orders.unshift(newOrder); // Add to beginning
      this.saveProfile(current);
    }
  }
}
