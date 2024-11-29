import { ApiService } from './../../services/api.service';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { User } from '../../models/models';
@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, InputTextareaModule, ButtonModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent {
  userInfoForm!: FormGroup;
  activeUser: User | null = null;

  get activeUserSubscription() {
    console.log(this.activeUser?.subscriptions);

    return this.activeUser?.subscriptions?.filter(({ isActive }) => isActive)[0]?.tariff?.name;
  }

  constructor(private fb: FormBuilder, private userService: UserService, private apiService: ApiService) {
    const user = userService.activeUser();
    this.activeUser = userService.activeUser();
    if (user) {
      this.userInfoForm = this.fb.group({
        id: [user.id!],
        firstName: [user.firstName, [Validators.required]],
        lastName: [user.lastName, [Validators.required]],
        email: [user.email, [Validators.required, Validators.email]],
        phone: [user.phone, [Validators.required, Validators.pattern('^[0-9]+$')]],
        address: [`${user.address!.city}, ${user.address!.streetName}`, [Validators.required]],
        roleId: [user.role.id],
      });

      this.userInfoForm.controls['address'].disable();
    }
  }

  onSubmit() {
    if (this.userInfoForm.valid) {
      this.apiService.editUser(this.userInfoForm.value).subscribe();
      console.log('Form Submitted:', this.userInfoForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
