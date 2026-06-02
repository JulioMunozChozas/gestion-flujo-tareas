import { Component, OnInit } from '@angular/core';
import { IonIcon, IonHeader, IonButton, IonTabs, IonTabButton, IonLabel, IonTabBar } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-workflow',
  templateUrl: './workflow.page.html',
  styleUrls: ['./workflow.page.scss'],
  imports: [IonTabBar, IonIcon, IonHeader, IonButton, IonTabs, IonTabButton, IonLabel],
})
export class WorkflowPage implements OnInit {

  constructor() {
     console.info("Bienvenidos/as a mi aplicación de Gestión del Flujo de los Trabajos y Tareas");
  }

  ngOnInit() {
  }

}
