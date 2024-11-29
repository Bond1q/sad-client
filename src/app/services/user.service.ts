import { tap } from 'rxjs';
import { User } from '../models/models';
import { ApiService } from './api.service';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiService = inject(ApiService);
  activeUser = signal<User | null>(null);
  constructor() {
    this.apiService
      .getUsersById(2)
      .pipe(tap((user) => this.activeUser.set(user)))
      .subscribe();
  }
}
