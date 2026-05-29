import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.page.html',
  styleUrls: ['./workflow.page.scss'],
})
export class WorkflowPage implements OnInit {

  constructor() {
     console.info("Bienvenidos/as a mi aplicación de Gestión del Flujo de los Trabajos y Tareas");
  }

  ngOnInit() {
  }

}
