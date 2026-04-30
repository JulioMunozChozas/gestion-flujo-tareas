import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page {
  input: string = '';
  listaTareas: any[] = [];

  constructor() {}

  mostrarTareas() {
    if (this.input.trim().length > 0) {
      this.listaTareas.push(this.input);// añadimos la tarea a la lista
      this.input = '';// espacio en blanco
    }
  }
}
