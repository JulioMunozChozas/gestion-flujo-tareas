import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonInput, IonTextarea } from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  standalone: true,
  imports: [IonTextarea, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    ReactiveFormsModule
  ]
})
export class CreateTaskModalComponent  implements OnInit {
  miTarea: FormGroup;
  listaTareas: any[] = [];

  constructor(
    private modalTaskController: ModalController,
    private taskBuilder: FormBuilder
  ) {
    this.miTarea = this.taskBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {}

  deshacerFormularioModal() {
    // Accedemos nuevamente a las opciones de la barra lateral saliendo del formulario modal
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
