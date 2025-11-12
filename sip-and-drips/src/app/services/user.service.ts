import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'assets/data/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
  }

  validateUser(username: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find((u: any) => u.username === username && u.password === password);
        return !!user;
      })
    );
  }
}