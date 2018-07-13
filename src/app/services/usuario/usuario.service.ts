import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
  public router:Router
) {
    this.cargarStorage()
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }


  //==============================================
  // Login google
  //==============================================
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.id, res.token, res.usuario)
          return true;
        }
        )
      );

  }

  //==============================================
  // Login
  //==============================================

  login(usuario: Usuario, recordar: boolean = false) {
    let url = URL_SERVICIOS + '/login';

    // Validar si recuerdame = check = true
    if (recordar) localStorage.setItem('email', usuario.email)
    else localStorage.removeItem('email')

    // Send request
    return this.http.post(url, usuario)
      .pipe(
        map((res: any) => {
          // localStorage.setItem('id', res.id);
          // localStorage.setItem('token', res.token);
          // localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this.guardarStorage(res.id, res.token, res.usuario);
          return true;
        })
      )
  }

  logout(){
    this.usuario=null;
    this.token='';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login'])
  }

  //==============================================
  // Registrar usuario
  //==============================================
  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .pipe(
        map((res: any) => {
          swal('Usuario creado ', usuario.email, 'success');
          return res.usuario;
        })
      )
  }


}
