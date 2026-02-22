import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastMessage, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts$!: Observable<ToastMessage[]>;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toasts$ = this.toastService.toasts$;
  }

  removeToast(id: string) {
    this.toastService.remove(id);
  }
}
