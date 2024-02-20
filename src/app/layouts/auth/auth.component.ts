import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wedding } from '@app/core/models/wedding.model';
import { AuthServiceService } from '@app/services/auth-service.service';
import { loadUser, setUser } from '@app/state/actions/user.actons';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  weddingInfo!: Wedding;
  constructor(
    private _auth: AuthServiceService,
    private _store: Store,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.weddingInfo = JSON.parse(localStorage.getItem('weddingInfo')!);
  }

  loginWithGoogle() {
    this._auth.signupWhitGoogle().then((user) => {
      // Aquí se corrige la sintaxis
      this._store.dispatch(loadUser());
      if (user) {
        this._store.dispatch(setUser({ user }));
        this.location.back();
      }
    });
  }
}
