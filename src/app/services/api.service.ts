import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Subscription, Tariff, User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  isAdmin = signal(false);

  private url = 'http://localhost:8000';

  getTariffs() {
    return this.http.get<Tariff[]>(`${this.url}/tariffs`);
  }

  createTariff(tariff: Partial<Tariff>) {
    return this.http.post<Tariff[]>(`${this.url}/tariffs`, { ...tariff });
  }

  getUsers() {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  getUsersById(id: number) {
    return this.http.get<User>(`${this.url}/users/${id}`);
  }

  editUser(user: User) {
    return this.http.put<boolean>(`${this.url}/users`, { ...user });
  }

  getSubscriptions() {
    return this.http.get<Subscription[]>(`${this.url}/subscriptions`);
  }

  createSubscriptions(subscription: Omit<Subscription, 'id'>) {
    return this.http.post<Subscription[]>(`${this.url}/subscriptions`, { ...subscription });
  }

  stopSubscriptions(subscriptionId: number) {
    return this.http.post<void>(`${this.url}/subscriptions/stop/${subscriptionId}`, {});
  }

  toggleIsAdmin() {
    this.isAdmin.update((value) => !value);
    console.log(this.isAdmin());
  }
}
