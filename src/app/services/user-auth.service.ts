import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  own_uid = null;
  
  constructor() { }

  get_own_user_id() {

    if (this.own_uid) {
      return this.own_uid;
    } else {
      const date_now = String(Date.now());
      this.own_uid = date_now.substr(-8);
      console.log(`-----%c own_uid ${this.own_uid}`, 'color:red');
      return this.own_uid;
    }

  }

}
