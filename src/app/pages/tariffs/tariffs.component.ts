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
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';

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
    CardModule,
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

  tariffsImages: Record<number, string> = {
    1: 'https://img.freepik.com/free-vector/distance-working-abstract-concept_335657-3049.jpg?t=st=1732900608~exp=1732904208~hmac=e935f64b78fa955aa86a7dd61064332b095d17743342cf377c2af3f8f5f79ce4&w=1380',
    2: 'https://img.freepik.com/free-vector/internet-day-concept-illustration_114360-5303.jpg?t=st=1732900821~exp=1732904421~hmac=195aa4813e52bf17a324d702920b5faddf2363ed191cd6b04e2dc131e2cab793&w=1380',
    3: 'https://img.freepik.com/free-vector/tiny-people-connected-with-multiple-intelligent-devices-smart-city-connected-living-global-online-services-intelligent-devices-network-concept_335657-653.jpg?t=st=1732901133~exp=1732904733~hmac=f1475cd8bda19c3a4166582174dc1771e3ede4fac41cb1b4f90b08ae21ba0318&w=2000',
    4: 'https://img.freepik.com/free-vector/digital-nomad-concept-illustration_114360-1082.jpg?t=st=1732901125~exp=1732904725~hmac=247776749a0480cecd06d8b7b19fc88d70efe85ea14def61e585861a796e9006&w=1380',
    5: 'https://img.freepik.com/free-vector/network-concept-illustration_114360-26715.jpg?t=st=1732901325~exp=1732904925~hmac=70e0616fd50fe9a0a7e55310dfb048fb40a84050aeef6e130f392ed91401d436&w=1380',
  };
  // {
  //   name: 'Basic Plan',
  //   description: 'Basic internet plan with limited data',
  //   internetSpeed: 50,
  //   dataLimit: 100,
  //   staticIPAddress: false,
  //   price: 25.0,
  //   televisionOptionId: 1,
  // },
  // {
  //   name: 'Unlimited Plan',
  //   description: 'Unlimited internet plan with moderate speed',
  //   internetSpeed: 100,
  //   dataLimit: null,
  //   staticIPAddress: true,
  //   price: 45.0,
  //   televisionOptionId: 2,
  // },
  // {
  //   name: 'Premium Plan',
  //   description: 'High-speed internet with premium features',
  //   internetSpeed: 200,
  //   dataLimit: null,
  //   staticIPAddress: true,
  //   price: 70.0,
  //   televisionOptionId: 3,
  // },
  // {
  //   name: 'Economy Plan',
  //   description: 'Economy internet plan with basic speed and no data cap',
  //   internetSpeed: 25,
  //   dataLimit: null,
  //   staticIPAddress: false,
  //   price: 15.0,
  //   televisionOptionId: null,
  // },
  // {
  //   name: 'Family Plan',
  //   description:
  //     'Family internet plan with fair price and decent speed and limit',
  //   internetSpeed: 50,
  //   dataLimit: 300,
  //   staticIPAddress: false,
  //   price: 35.0,
  //   televisionOptionId: null,
  // },

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
