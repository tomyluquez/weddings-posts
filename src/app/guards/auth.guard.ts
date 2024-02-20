import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { selectInfoUser } from '@app/state/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectInfoUser).pipe(
      map((user) => {
        if (user.userName) {
          return true; // Si hay un usuario guardado en el store, permite el acceso a la ruta
        } else {
          this.router.navigate(['/login']); // Si no hay un usuario guardado, redirige al login
          return false;
        }
      }),
      take(1) // toma solo el primer valor emitido y completa la suscripción
    );
  }
}
