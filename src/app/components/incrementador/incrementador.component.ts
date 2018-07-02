import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})


export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress : ElementRef;

  // Inputs
  @Input() leyenda: string = 'leyenda'
  @Input() progreso: number = 50

  // Outputs
  @Output() cambioProgreso: EventEmitter<number> = new EventEmitter();


  progresoT: number;

  constructor() { }

  ngOnInit() {
  }

  onChange(newValue: number) {
    // Con JS puro
    //let elemHTML: any = document.getElementsByName('progreso')[0]

    if (newValue >= 100) this.progreso = 100
    else if (newValue <= 0) this.progreso = 0
    else this.progreso = newValue

    // Con JS puro
    //elemHTML.value = Number(this.progreso)
    
    // Con ViewChild
    this.txtProgress.nativeElement.value=this.progreso

    this.cambioProgreso.emit(this.progreso)
  }

  changeProgress(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;
    this.cambioProgreso.emit(this.progreso);
    
    // Setear el foco al componente
    this.txtProgress.nativeElement.focus();
  }



}
