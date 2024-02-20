import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { User } from '@app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private _auth: Auth) {}

  signupWhitGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    return signInWithPopup(auth, provider)
      .then((result) => {
        return { userName: result.user.displayName, mail: result.user.email };
      })
      .catch((error) => {
        console.log(error);
        throw error; // Lanzar nuevamente el error para que sea manejado externamente
      });
  }
}
