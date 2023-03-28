import { Injectable } from '@angular/core';
import { concatMap, from, Observable, of, switchMap  } from 'rxjs';
import {Auth,signInWithEmailAndPassword,authState,createUserWithEmailAndPassword,updateProfile,UserInfo,UserCredential,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}
