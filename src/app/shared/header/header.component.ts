import { Component, OnInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _usuarioService:UsuarioService) { }

  ngOnInit() {
  }



}
