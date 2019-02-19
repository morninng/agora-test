import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  own_uid;

  constructor() { }

  get_ownid(){
    if (!this.own_uid) {
      const date_now = String(Date.now());
      this.own_uid = date_now.substr(-8);
    }
    return this.own_uid;
  }
}
