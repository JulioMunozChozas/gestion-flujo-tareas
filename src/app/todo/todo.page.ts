import { Component, OnInit } from '@angular/core';
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFormModalComponent } from '../task-form-modal/task-form-modal.component';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, eyeOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponentModule],
})
export class TodoPage implements OnInit {
  input: string = '';
  listaTareas: any[] = [];

  constructor(private modalTaskController: ModalController) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'eye-outline': eyeOutline
    });
  }

  ngOnInit() {}

  async modalCreaTareas() {
    console.log("Formulario modal de Tarea");
     const modalTask = await this.modalTaskController.create({
      component: TaskFormModalComponent,
      cssClass: 'task-form-modal.component.scss'
    });

    modalTask.onDidDismiss().then((respuesta) => {
      // Validamos que venga con datos y que el rol sea 'tarea'
      if (respuesta.data && respuesta.role === 'tarea') {
        const nuevaTarea = respuesta.data; // Esto contiene el objeto { nombre: '...', descripcion: '...' } etc.
        this.aniadirTareas(nuevaTarea);
      }
    });

    return await modalTask.present();
  }

  aniadirTareas(NuevaTarea: any) {
    this.listaTareas.push(NuevaTarea);// añadimos la tarea a la lista
    console.log("Tarea "+NuevaTarea.nombre+" añadida correctamente");
  }

  eliminarTareas() {
    this.listaTareas = [];// para eliminar todas las tareas directamente
    console.log("Todas las tareas se han eliminado correctamente");
  }
}
