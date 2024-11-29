import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-communication-modal',
  standalone: true,
  imports: [DialogModule, AccordionModule, CommonModule, DropdownModule, FormsModule, InputMaskModule, ButtonModule, ToastModule, RouterModule],
  providers: [MessageService],
  templateUrl: './communication-modal.component.html',
  styleUrl: './communication-modal.component.css',
})
export class CommunicationModalComponent {
  @Input() displayModal = false;
  @Output() displayModalChange = new EventEmitter<boolean>();

  messageService = inject(MessageService);

  selectedCommunicationOption = 1;
  options = [
    { label: 'Communicate via phone', id: 1 },
    { label: 'Communicate via chat', id: 2 },
  ];

  phone = '';

  onCallMeClick() {
    if (this.phone.split('').filter((el) => !isNaN(Number(el))).length > 9) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'We will call you ASAP!' });
      this.displayModalChange.emit();
    }
  }
}
