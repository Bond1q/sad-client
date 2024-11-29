import { Component, computed, effect, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarModule, RouterModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  apiService = inject(ApiService);
  userService = inject(UserService);

  user = computed(() => {
    return this.userService.activeUser()?.firstName + ' ' + this.userService.activeUser()?.lastName;
  });

  title = 'sad-client';
}
