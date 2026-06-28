import { Component, OnInit } from '@angular/core';
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

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

  constructor(private modalTaskController: ModalController) { }

  ngOnInit() {
  }

  async modalCreaTareas() {
    console.log("Formulario modal de crear nueva Tarea");
     const modalNewTask = await this.modalTaskController.create({
      component: CreateTaskModalComponent,
      cssClass: 'create-task-modal.component.scss'
    });
    
    return await modalNewTask.present();
  }

  mostrarTareas() {
    if (this.input.trim().length > 0) {
      this.listaTareas.push(this.input);// añadimos la tarea a la lista
      this.input = '';// espacio en blanco
    }
  }

}
