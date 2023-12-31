import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private CurrentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.CurrentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
      })
    )
  }
  
  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
      })
    )
  }

  setCurrentuser(user: User) {
    this.CurrentUserSource.next(user);//update value when emmit any change happen 
  }

  logout() {
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
  }
}
