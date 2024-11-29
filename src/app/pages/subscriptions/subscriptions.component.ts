import { Component, inject, OnInit, signal } from '@angular/core';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { Subscription, Tariff } from '../../models/models';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { TariffModalComponent } from '../../components/tariff-modal/tariff-modal.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    TariffModalComponent,
    AccordionModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent implements OnInit {
  apiService = inject(ApiService);
  formBuilder = inject(FormBuilder);
  messageService = inject(MessageService);

  subscriptions = signal<Subscription[]>([]);
  selectedTariff = signal<Tariff | null>(null);

  editing = signal(false);
  displayModal = false;
  isAdmin = this.apiService.isAdmin;

  subscriptionForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    description: ['', Validators.required],
    dataLimit: [0, Validators.required],
    internetSpeed: [0, Validators.required],
    // televisionOption: [0, Validators.required],
  });

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  selectTariff(tariff: Tariff) {
    this.selectedTariff.set(tariff);
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }

  openModal() {
    this.displayModal = true;
  }

  loadSubscriptions() {
    this.apiService
      .getSubscriptions()
      .pipe(
        take(1),
        tap((data) => {
          console.log(data);

          return this.subscriptions.set(data);
        })
      )
      .subscribe();
  }

  stopSubscription(id: number) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your subscription was successfully stopped!' });

    this.apiService
      .stopSubscriptions(id)
      .pipe(tap(() => this.loadSubscriptions()))
      .subscribe();
  }
}
