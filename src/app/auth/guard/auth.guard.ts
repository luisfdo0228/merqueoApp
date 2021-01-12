import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(){
    if (sessionStorage.getItem('accessToken')) {
      return false;
    } else {
      return true;
    }

    // return true;
  }
  
}
