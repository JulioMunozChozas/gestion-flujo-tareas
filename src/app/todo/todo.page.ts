import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None // Permite que los estilos de este archivo salgan al DOM global
})
export class TodoPage implements OnInit {
  input: string = '';
  listaTareas: any[] = [];
  botonConfirmacion: any[] = [];
  // Variables para el diseño del mensaje de confirmación
  modalConfirmacionEliminar = false;
  tareaSeleccionada: any = null;

  constructor(private modalTaskController: ModalController) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'eye-outline': eyeOutline
    });
  }

  ngOnInit() {}

  async modalCreaTareas() {
     const modalTask = await this.modalTaskController.create({
      component: TaskFormModalComponent,
      cssClass: 'task-form-modal.component.scss'
    });

    await modalTask.present();

    // Recogemos la tarea cuando el usuario pulsa "Añadir Tarea"
    const { data } = await modalTask.onWillDismiss();
    if (data) {
      data.id = crypto.randomUUID(); // Generamos Id a la nueva tarea con número UUID generado aleatoriamente
      this.aniadirTareas(data); // Añadimos la nueva tarea
    }
  }

  aniadirTareas(NuevaTarea: any) {
    this.listaTareas.push(NuevaTarea);// añadimos la tarea a la lista
    console.log("Tarea "+NuevaTarea.nombre+" añadida correctamente");
  }


  async modalEditaTareas(tarea: any) {
    console.log("Formulario modal de Tarea");
     const modalTask = await this.modalTaskController.create({
      component: TaskFormModalComponent,
      cssClass: 'task-form-modal.component.scss',
      componentProps: {
        tareaSeleccionada: tarea, //le pasamos la tarea seleccionada
      }
    });

    await modalTask.present();

    const {data, role } = await modalTask.onDidDismiss();// al cerrar el modal recogemos los datos

    if (role === 'confirm' && data) {
      const index = this.listaTareas.findIndex(tarea => tarea.id === data.id);

      if (index !== -1) {
        this.listaTareas[index] = data;// editamos la tarea seleccionada
        this.listaTareas = [...this.listaTareas];// recargamos las tareas nuevamente
        console.log('Tarea '+data.nombre+' editada correctamente');// mensaje de tarea editada correctamente mostrado
      }
    }
  }

  editarTarea(tareaActualSeleccionada: any) {
    // Abrimos el formulario del modal para editar la tarea seleccionada
    if (tareaActualSeleccionada) {
      console.log("Formulario editar tarea "+tareaActualSeleccionada.nombre);
      this.modalEditaTareas(tareaActualSeleccionada);
    }
  }


/* Métodos que pertenecen al mensaje de confirmación del modal */
  modalEliminaTarea(tarea: any) {
    this.tareaSeleccionada = tarea;
    this.modalConfirmacionEliminar = true;
  }

  cancelarEliminar() {
    this.modalConfirmacionEliminar = false;
    this.tareaSeleccionada = null;
  }

  confirmarEliminar() {
    if (this.tareaSeleccionada)
      this.eliminarTarea(this.tareaSeleccionada);
    this.cancelarEliminar();
  }


  eliminarTarea(tareaActualSeleccionada: any) {
    try{
      this.listaTareas = this.listaTareas.filter(tarea => tarea !== tareaActualSeleccionada);// acción de eliminar la tarea
      console.log("Tarea "+tareaActualSeleccionada.nombre+" eliminada correctamente");
    }
    catch(error){
      console.error("Error producido al elimina la tarea "+tareaActualSeleccionada.nombre);
    }
  }


  eliminarTareas() {
    this.listaTareas = [];// para eliminar todas las tareas directamente (Limpiar Historial)
    console.log("Todas las tareas se han eliminado correctamente");
  }
}
