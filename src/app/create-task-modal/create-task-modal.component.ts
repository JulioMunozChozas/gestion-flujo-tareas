import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
      // Dato obligatorio, máximo 100 caracteres
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      // Dato opcional, máximo 500 caracteres
      descripcion: ['', [Validators.maxLength(500)]],
      // Dato obligatorio
      prioridad: ['', [Validators.required]],
      // Dato opcional, pero valida que no sea anterior a la fecha actual
      fechaLimite: ['',[this.validarFechaFutura]],
      // Dato obligatorio
      categoria: ['', [Validators.required]],
      // Dato opcional, máximo 500 caracteres
      observaciones: ['', [Validators.maxLength(500)]],
      // Asignado automáticamente al crear (por defecto: 'Pendiente')
      estado: ['Pendiente'],
      // Asignado automáticamente al crear (por defecto: 0)
      progreso: [0],
    });
  }

  ngOnInit() {
    console.log("Formulario modal de Tareas");
  }

  deshacerFormularioModal() {
    this.modalTaskController.dismiss();// para salir del formulario modal
  }

  /* Validador personalizado para asegurar que la fecha sea posterior o igual a la actual */
  validarFechaFutura(abstractControl: AbstractControl): ValidationErrors | null {
    if (!abstractControl.value) return null;// Si es opcional y está vacío, es válido

    // Obtenemos la fecha actual en formato YYYY-MM-DD respetando la zona horaria local
    const fechaActual = new Date().toLocaleDateString('en-CA');

    // Comparamos cadenas YYYY-MM-DD directamente para evitar problemas con zonas horarias
    return abstractControl.value >= fechaActual ? null : { fechaPasada: true };
  }

  crearTarea() {
    if (this.miTarea.valid) {
      // Envía los datos del formulario y el rol 'tarea'
      this.modalTaskController.dismiss(this.miTarea.value, 'tarea');
      console.log("Tarea "+this.miTarea.value.nombre+" añadida correctamente");
    }
    else
      console.error("Error al añadir la tarea "+this.miTarea.value.nombre);
  }
}
