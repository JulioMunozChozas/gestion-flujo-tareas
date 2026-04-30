import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  constructor() {
    console.info("Bienvenidos/as a mi aplicación de Gestión del Flujo de los Trabajos y Tareas");
  }

}
