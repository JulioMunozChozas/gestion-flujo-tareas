import { Component, EventEmitter, Input, OnInit, Output, ApplicationConfig, LOCALE_ID, ViewEncapsulation } from '@angular/core';
// Para el manejo de fechas con TypeScript
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { IonButton, IonButtons, IonContent, IonModal, IonTitle, IonToolbar, IonHeader, IonIcon, IonText, IonProgressBar, IonFooter } from "@ionic/angular/standalone";
// Importamos los iconos de la parte de Ver Detalles de la tarea
import { addIcons } from 'ionicons';
import { newspaperOutline, flag, calendarOutline, briefcase, informationCircleOutline, closeOutline, documentText, hourglass, pieChartSharp, chatbubbleEllipses } from 'ionicons/icons';
// Importamos los datos del idioma español de España
import localeEs from '@angular/common/locales/es';


// Registrar los datos de idioma de España, nombre de método por defecto
registerLocaleData(localeEs, 'es-ES');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
};

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
  styleUrls: ['./task-details-modal.component.scss'],
  imports: [IonFooter, IonProgressBar, IonText, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, DatePipe, CommonModule],
  encapsulation: ViewEncapsulation.None // Permite que los estilos de este archivo salgan del DOM global
})

export class TaskDetailsModalComponent implements OnInit {
  listaTareas: any[] = [];

  @Input() tareaSeleccionada: any;// para mostrar el formulario de editar tarea seleccionada
  @Input() modalDetalles: boolean = false;// para mostrar u ocultar el modal de Ver Detalles de la tarea
  @Output() mostrarModalDetalles = new EventEmitter<void>();
  @Input() isModalOpen: boolean = false;

  nombreTarea: string = '';
  descripcionTarea: string = '';
  prioridadTarea: string = '';
  fechaLimiteTarea: Date = new Date();
  categoriaTarea: string = '';
  observacionesTarea: string = '';

  constructor(private modalTaskController: ModalController) {
    addIcons({
      'newspaper-outline': newspaperOutline,
      'document-text': documentText,
      'flag': flag,
      'calendar-outline': calendarOutline,
      'briefcase': briefcase,
      'hourglass': hourglass,
      'pie-chart-sharp': pieChartSharp,
      'chatbubble-ellipses-': chatbubbleEllipses,
      'information-circle-outline': informationCircleOutline,
      'close-outline': closeOutline
    });
  }

  ngOnInit() {}


  async mostrarDetallesTarea(tareaActualSeleccionada: any) {
      console.log("Detalles de tarea "+tareaActualSeleccionada.nombre+" mostrados");
      const detallesTarea = await this.modalTaskController.create({
        component: TaskDetailsModalComponent,
        componentProps: {tareaSeleccionada: tareaActualSeleccionada},
        cssClass: 'modal-detalles-tarea'
      });

      await detallesTarea.present();

      // Inyectamos variables al modal de Detalles de la Tarea
      const modalDetallesTarea = document.querySelector('ion-modal.modal-detalles-tarea') as HTMLElement;
      if (modalDetallesTarea) {
        modalDetallesTarea.style.setProperty('--height', '850px');
        modalDetallesTarea.style.setProperty('--max-height', '90vh');
        modalDetallesTarea.style.setProperty('--width', '500px');
      }
  }


  // Aquí obtenemos el estado de la tarea en Ver Detalles de Tarea
  obtenerEstado(estado?: string): string {
    const estadoTarea: Record<string, string> = {
      'Pendiente':   'pendiente',
      'En Progreso': 'en-progreso',
      'Completada':  'completada',
      'Cancelada':   'cancelada'
    };
    return estado ? estadoTarea[estado] || '': '';
  }


  cerrarModalDetalles() {
    // Para mostrar las tareas al volver nuevamente al listado con el método de la clase ToDo al cerrar el modal
    this.modalTaskController.dismiss();
  }

}
