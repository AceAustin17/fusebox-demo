import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = new BehaviorSubject<any>(undefined);

  getToken(){return this.token.getValue()};

  updateToken(token: any) {
    this.token.next(token);
  }
}
