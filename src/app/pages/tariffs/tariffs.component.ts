import { Component, inject, OnInit, signal } from '@angular/core';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { Tariff } from '../../models/models';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { TariffModalComponent } from '../../components/tariff-modal/tariff-modal.component';
import { ArrangeTariffModalComponent } from '../../components/arrange-tariff-modal/arrange-tariff-modal.component';
import { CommunicationModalComponent } from '../../components/communication-modal/communication-modal.component';

@Component({
  selector: 'app-tariffs',
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
    ArrangeTariffModalComponent,
    CommunicationModalComponent,
  ],
  templateUrl: './tariffs.component.html',
  styleUrl: './tariffs.component.css',
})
export class TariffsComponent implements OnInit {
  apiService = inject(ApiService);
  formBuilder = inject(FormBuilder);
  selectedTariff = signal<Tariff | null>(null);

  tariffs = signal<Tariff[]>([]);

  editing = signal(false);

  displayInfoModal = false;
  displayArrangeModal = false;
  displayCommunicationModal = false;

  isAdmin = this.apiService.isAdmin;

  tariffForm = this.formBuilder.group({
    tariffName: [''],
    startDate: ['', Validators.required],
    endDate: [''],
    userId: [0],
    tariffId: [0],
    includeTelevision: [null],
    televisionPlanType: [''],
    televisionPrice: [0],
    totalPrice: [0],
  });

  ngOnInit(): void {
    this.loadTariffs();
  }

  selectTariff(tariff: Tariff) {
    this.selectedTariff.set(tariff);

    const { name, price, id, televisionOption } = tariff;
    this.tariffForm.reset();
    this.tariffForm.controls.tariffName.setValue(name, { emitEvent: false });
    this.tariffForm.controls.totalPrice.setValue(price, { emitEvent: false });
    this.tariffForm.controls.tariffId.setValue(id, { emitEvent: false });
    this.tariffForm.controls.televisionPlanType.setValue(televisionOption?.packageType ?? '', { emitEvent: false });
    this.tariffForm.controls.televisionPrice.setValue(televisionOption?.price ?? 0, { emitEvent: false });
  }

  createTariff() {
    this.apiService
      .createSubscriptions({
        ...this.tariffForm.value,
        userId: 1,
        includeTelevision: !!this.tariffForm.value.includeTelevision?.['length'],
      } as any)
      .pipe(
        take(1),
        tap(() => this.loadTariffs())
      )
      .subscribe();
  }

  toggleArrangeModal() {
    this.displayArrangeModal = !this.displayArrangeModal;
  }

  toggleInfoModal() {
    this.displayInfoModal = !this.displayInfoModal;
  }

  toggleCommunicationModal() {
    this.displayCommunicationModal = !this.displayCommunicationModal;
  }

  loadTariffs() {
    this.apiService
      .getTariffs()
      .pipe(
        take(1),
        tap((data) => {
          return this.tariffs.set(data);
        })
      )
      .subscribe();
  }
}
