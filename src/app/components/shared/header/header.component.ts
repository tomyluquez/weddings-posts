import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Wedding } from '@app/core/models/wedding.model';
import { AuthServiceService } from '@app/services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() wedding?: Wedding;
  @Input() userName?: string | null;
  isOpenOptionsMenu: boolean = false;

  imgBg = './assets/bg-header.webp';

  constructor(private _auth: AuthServiceService) {}

  toggleOptionsMenu() {
    this.isOpenOptionsMenu = !this.isOpenOptionsMenu;
  }

  loguot() {
    this._auth.signOut().then(() => {
      localStorage.removeItem('userState');
      window.location.reload();
    });
  }
}
