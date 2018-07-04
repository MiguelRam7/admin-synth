import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {

    this.subscription = this.crearObservable()
      .pipe(retry(2))
      .subscribe(
        numero => console.log('subs', numero),
        error => console.log(error));

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


  crearObservable(): Observable<any> {
    return new Observable(
      (Subscriber: Subscriber<any>) => {
        let cont = 0;
        let body = { valor: cont }


        let intervalo = setInterval(() => {
          cont++;
          Subscriber.next(cont);
        }, 1000)


      })
      .pipe(
        map(response => response.valor),
        filter(valor => valor % 2 != 0)
      )
  }



}
