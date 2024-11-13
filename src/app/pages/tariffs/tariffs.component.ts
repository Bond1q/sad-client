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
  displayModal = false;
  isAdmin = this.apiService.isAdmin;

  tariffForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    description: ['', Validators.required],
    dataLimit: [0, Validators.required],
    internetSpeed: [0, Validators.required],
    // televisionOption: [0, Validators.required],
  });

  ngOnInit(): void {
    this.loadTariffs();
  }

  selectTariff(tariff: Tariff) {
    this.selectedTariff.set(tariff);
    this.displayModal = true;
  }

  createTariff() {
    this.apiService
      .createTariff({ ...this.tariffForm.value, id: this.tariffs.length + 1 } as any)
      .pipe(
        take(1),
        tap(() => this.loadTariffs())
      )
      .subscribe();
  }

  closeModal() {
    this.displayModal = false;
  }

  openModal() {
    this.displayModal = true;
  }

  loadTariffs() {
    this.apiService
      .getTariffs()
      .pipe(
        take(1),
        tap((data) => {
          console.log(data);

          return this.tariffs.set(data);
        })
      )
      .subscribe();
  }
}
