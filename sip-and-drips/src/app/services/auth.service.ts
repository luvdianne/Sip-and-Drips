import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'assets/data/users.json';

  constructor(private http: HttpClient) {}

  validateUser(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        return !!user;
      })
    );
  }
}