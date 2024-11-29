import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {
  messages = [{ text: 'Hello, how can I help you?', sentByMe: false }];
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sentByMe: true });

      if (this.newMessage.includes('tariff')) {
        this.messages.push({ text: 'I will help you to choose the tariff that suits you best!', sentByMe: false });
        this.messages.push({
          text: 'Can you please send me your phone number. I will call you for more convenient communication)',
          sentByMe: false,
        });
      }

      if (this.newMessage.includes('09')) {
        this.messages.push({ text: 'Thank you! I will call you ASAP', sentByMe: false });
      }

      if (this.newMessage.includes('problem')) {
        this.messages.push({
          text: "Ohh, I will contact with out tech support, we will help to solve your problem. Don't worry!",
          sentByMe: false,
        });
      }

      this.newMessage = '';
    }
  }
}
