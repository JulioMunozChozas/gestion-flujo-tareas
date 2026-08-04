import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonInput, IonTextarea, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  standalone: true,
  imports: [IonLabel,
    IonTextarea,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule
  ]
})
export class CreateTaskModalComponent  implements OnInit {
  miTarea: FormGroup;
  listaTareas: any[] = [];
  // Fecha con el formato "YYYY-MM-DD"
  fechaInicial: string = new Date().toLocaleDateString('sv-SE');
  fechaMinima = new Date();

  constructor(
    private modalTaskController: ModalController,
    private taskBuilder: FormBuilder
  ) {
    this.miTarea = this.taskBuilder.group({
      nombre: ['', Validators.required],// dato obligatorio
      descripcion: ['', null],// dato opcional
      prioridad: ['', Validators.required],// dato obligatorio
      fecha: [this.fechaInicial, Validators.required],// dato obligatorio
      categoria: ['', null],// dato opcional
      observaciones: ['', null] //dato opcional
    });
  }

  ngOnInit() {}

  deshacerFormularioModal() {
    // Accedemos a las opciones de la barra lateral saliendo del formulario modal
    this.modalTaskController.dismiss();
  }

  aniadirTarea() {
    if (this.miTarea.valid) {
      // Envía los datos del formulario y el rol 'tarea'
      this.modalTaskController.dismiss(this.miTarea.value, 'tarea');

      console.log("Tarea "+this.miTarea.value.nombre+" añadida correctamente");
    }
    else {
      console.error("Error al añadir la tarea "+this.miTarea.value.nombre);
    }
  }
}
