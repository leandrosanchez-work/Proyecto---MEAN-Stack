import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router){}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if(token){
      return true; //permitir accesi si es el token
    }else{
      this.router.navigate(['/login']); //redirigir al login si ni hay token
      return false;
    }
  }

}
