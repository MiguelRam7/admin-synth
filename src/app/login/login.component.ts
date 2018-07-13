import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

// Google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  // Google
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.googleInit();

    // Inicializar input del email en relacion al "recuerdame"
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) this.recuerdame = true;

  }


  //==============================================
  // Login
  //==============================================
  login(forma: NgForm) {

    // Validar el formulario
    if (!forma.valid) return;

    // Crear objeto del usuario para mandar al http
    let usuario = new Usuario(null, forma.value.email, forma.value.password)

    // Obtener respuesta de la request
    this._usuarioService.login(usuario, this.recuerdame)
      .subscribe(success => this.router.navigate(['/dashboard']))

  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '113612310959-bhk2on3rmth5ind1vpkcfeheptg8karf.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    })
  }


  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        .subscribe(res => window.location.href='#/dashboard');

    })
  }
}
