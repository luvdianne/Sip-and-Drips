import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.loadUsers();
  }

  private loadUsers(): void {
    this.http.get<{ users: User[] }>('assets/data/users.json').subscribe(
      (data) => {
        this.users = data.users;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  public login(username: string, password: string): Observable<User | null> {
    return new Observable((observer) => {
      setTimeout(() => {
        const user = this.users.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          observer.next(user);
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 500);
    });
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
