import { Component, Input, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { Tariff } from '../../models/models';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-tariff-modal',
  standalone: true,
  imports: [DialogModule, AccordionModule, CommonModule, DividerModule],
  templateUrl: './tariff-modal.component.html',
  styleUrl: './tariff-modal.component.css',
})
export class TariffModalComponent {
  @Input() tariff: Tariff | null = null;
  @Input() displayModal = false;
}
