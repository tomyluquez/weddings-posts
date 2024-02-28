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

  async signupWhitGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      return {
        userName: user.displayName,
        mail: user.email,
        photo: user.photoURL,
      };
    } catch (error) {
      console.log(error);
      throw error; // Lanzar nuevamente el error para que sea manejado externamente
    }
  }

  async signOut() {
    await this._auth.signOut();
  }
}
