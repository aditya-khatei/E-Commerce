import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$: Observable<ToastMessage[]> = this.toastsSubject.asObservable();

  show(type: 'success' | 'error' | 'info', title: string, message: string, duration = 3000) {
    const id = Math.random().toString(36).substring(2, 9);
    const currentToasts = this.toastsSubject.value;

    // Create new toast
    const newToast: ToastMessage = { id, type, title, message };
    this.toastsSubject.next([...currentToasts, newToast]);

    // Auto-remove after duration
    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: string) {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
  }
}
