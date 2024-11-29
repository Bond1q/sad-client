import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { Tariff } from '../../models/models';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { tap } from 'rxjs';
@Component({
  selector: 'app-arrange-tariff-modal',
  standalone: true,
  imports: [
    DialogModule,
    AccordionModule,
    CommonModule,
    DividerModule,
    ReactiveFormsModule,
    CalendarModule,
    ReactiveFormsModule,
    CheckboxModule,
    AccordionModule,
  ],
  templateUrl: './arrange-tariff-modal.component.html',
  styleUrl: './arrange-tariff-modal.component.css',
})
export class ArrangeTariffModalComponent implements OnInit {
  @Input() tariffForm!: FormGroup;
  @Input() displayModal = false;
  @Output() displayModalChange = new EventEmitter<boolean>();
  @Output() createSubscription = new EventEmitter<void>();

  minDate = new Date();
  ngOnInit(): void {
    this.tariffForm
      .get('includeTelevision')
      ?.valueChanges.pipe(
        tap((value) => {
          const televisionPrice = this.tariffForm.value.televisionPrice;
          const includeTelevision = !!value?.length;

          const totalPrice = this.tariffForm.get('totalPrice')?.value;
          this.tariffForm
            .get('totalPrice')
            ?.setValue(includeTelevision ? totalPrice + televisionPrice : totalPrice - televisionPrice, { emitEvent: false });
        })
      )
      .subscribe();
  }
}
