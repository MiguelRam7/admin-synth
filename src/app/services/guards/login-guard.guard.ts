import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../service.index';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService:UsuarioService, public router:Router){

  }
  
  canActivate(){
    
    if(this._usuarioService.estaLogueado()){
      console.log('paso por el guard');
      return true;
    }else{
      console.log('NO paso por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
