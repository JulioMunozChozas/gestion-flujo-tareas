import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonInput, IonTextarea } from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
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
export class TaskFormModalComponent implements OnInit {
  miTarea: FormGroup;
  listaTareas: any[] = [];
  // Fecha con el formato "YYYY-MM-DD"
  fechaInicial: string = new Date().toLocaleDateString('sv-SE');
  fechaMinima = new Date();

  @Input() tareaSeleccionada: any;// para mostrar el formulario de editar tarea seleccionada
  nombreTarea: string = '';
  descripcionTarea: string = '';
  prioridadTarea: string = '';
  fechaLimiteTarea: Date = new Date();
  categoriaTarea: string = '';
  observacionesTarea: string = '';


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
      // Fecha de creación (por defecto: fecha actual)
      fechaCreacion: [new Date()],
      // Última actualización (coincide con la fecha de creación al añadir nueva tarea)
      fechaActualizacion: [new Date()]
    });
  }

  ngOnInit() {
    console.log("Formulario modal de Tareas");

    this.mostrarFormularioModalEdicion();// mostramos los datos del formulario de editar tarea
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

  mostrarFormularioModalEdicion() {
    /** Para cuándo estemos en el formulario modal a la hora de editar una tarea seleccionada */
    if (this.tareaSeleccionada) {
      let fechaFormateada = '';

      if (this.tareaSeleccionada.fechaLimite)
      fechaFormateada = new Date(this.tareaSeleccionada.fechaLimite).toISOString().split('T')[0];

    // Parcheamos la fecha existente desde la parte de editar formulario
    if (this.tareaSeleccionada) {
      this.miTarea.patchValue({
        nombre: this.tareaSeleccionada.nombre,
        descripcion: this.tareaSeleccionada.descripcion,
        prioridad: this.tareaSeleccionada.prioridad,
        fechaLimite: this.tareaSeleccionada.fechaLimite ? new Date(this.tareaSeleccionada.fechaLimite).toISOString() : '',
        categoria: this.tareaSeleccionada.categoria,
        observaciones: this.tareaSeleccionada.observaciones
      });
    }
    }
  }
  guardarTarea() {
    if (this.miTarea.valid) {
      const tareaEditada = this.tareaSeleccionada != null;
      // Pasamos los datos del formulario de vuelta a la página principal
      // Si estamos editando, le devolvemos también el ID para saber cuál actualizar
      const tarea = {
        ...this.miTarea.value,
       id: tareaEditada ? this.tareaSeleccionada.id : null,

      fechaCreacion: tareaEditada ? this.tareaSeleccionada.fechaCreacion : this.miTarea.value.fechaCreacion,// mantener dato de tarea

      // CRÍTICO: La fecha de actualización siempre se renueva al momento exacto del guardado.
      fechaActualizacion: new Date()
      };

      this.modalTaskController.dismiss(tarea, 'confirm');
    }
  }

  editarTarea() {
    if (!this.tareaSeleccionada) return;

    let fechaFormateada = this.tareaSeleccionada.fechaLimite
    ? new Date(this.tareaSeleccionada.fechaFormateada).toISOString()
    : null;

    // patchValue mapea las propiedades con los controles del formulario
    this.miTarea.patchValue({
      ...this.tareaSeleccionada,
      fechaLimite: fechaFormateada,
      // Forzamos a cargar la fecha de creación y actualización originales en el formulario
      fechaCreacion: this.tareaSeleccionada.fechaCreacion,
      fechaActualizacion: this.tareaSeleccionada.fechaActualizacion
    });
  }
}
