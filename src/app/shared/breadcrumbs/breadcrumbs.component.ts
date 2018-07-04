import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string = '';

  constructor(private router: Router, private title: Title, private meta: Meta) {

    this.getDataRoute()
      .subscribe(data => {

        this.titulo = data.titulo; // data.titulo viene del pages.routes.ts > rutas.data['titulo]
        this.title.setTitle(this.titulo) // setear titulo a la ventana del componente actual

        let descripcion: string = data.descripcion;

        const metaTag: MetaDefinition = {
          name: 'Descripcion',
          description: descripcion
        }

        this.meta.updateTag(metaTag)

      });
  }

  getDataRoute() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((evento: ActivationEnd) => evento.snapshot.data)
      )
  }

  ngOnInit() {
  }

}
