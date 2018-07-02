import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styleUrls: ['./graficas1.component.css']
})
export class Graficas1Component implements OnInit {

  graficos={
    'grafico1':{
      'labels':['frijoles','natilla','tocino'],
      'data':[24,30,46],
      'type':'doughnut',
      'title':'El pan se come con'
    },
    'grafico2':{
      'labels':['Hombres','Mujeres'],
      'data':[4500,6000],
      'type':'doughnut',
      'title':'Entrevistados'
    },
    'grafico3':{
      'labels':['PSP','Xbox','Console'],
      'data':[64,10,36],
      'type':'doughnut',
      'title':'Consolas preferidas'
    },
    'grafico4':{
      'labels':['Motorola','Samsung','Xiaomi'],
      'data':[234,120,76],
      'type':'doughnut',
      'title':'Smartphones populares'
    },
  }
  constructor() { }

  ngOnInit() {
  }

}
