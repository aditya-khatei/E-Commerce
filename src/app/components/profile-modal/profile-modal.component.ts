import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { UserService, UserProfile } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  isOpen$!: Observable<boolean>;
  name = '';
  email = '';
  orders: any[] = [];

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this.modalService.profileOpen$;
    this.userService.profile$.subscribe(profile => {
      if (profile) {
        this.name = profile.name;
        this.email = profile.email;
        this.orders = profile.orders || [];
      }
    });
  }

  saveProfile() {
    if (!this.name.trim() || !this.email.trim()) {
      this.toastService.show('error', 'Missing Information', 'Please enter both name and email!');
      return;
    }
    const currentOrders = this.orders || [];
    this.userService.saveProfile({ name: this.name.trim(), email: this.email.trim(), orders: currentOrders });
    this.toastService.show('success', 'Profile Saved', 'Your details have been updated.');
    this.close();
  }

  close() {
    this.modalService.closeProfile();
  }
}
