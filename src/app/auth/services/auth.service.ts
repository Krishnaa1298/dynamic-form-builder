import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSub = new BehaviorSubject<any | null>(null);
  public currentUser$ = this.currentUserSub.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSub.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<any> {
    const user: any = {
      id: 1,
      username: username,
      role: username === 'admin' ? 'admin' : 'user'
    };

    return of(user).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSub.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSub.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSub.value !== null;
  }

  isAdmin(): boolean {
    return this.currentUserSub.value?.['role'] === 'admin';
  }
}
