import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AgoraIoService } from 'agora-io';

@Injectable({
  providedIn: 'root'
})
export class BeforeenterBeforeGameGuard implements CanActivate {

  constructor(
    private agoraIoService: AgoraIoService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const is_initialized = this.agoraIoService.get_is_initialized()
      if (is_initialized) {
        return true;
      } else {
        this.router.navigate(['/livevideo/before-enter/']);
      }

  }
}
