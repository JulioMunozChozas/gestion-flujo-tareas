import { Component, OnInit } from '@angular/core';
import { IonHeader, IonButton } from "@ionic/angular/standalone";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

  mostrarTareas() {
    if (this.input.trim().length > 0) {
      this.listaTareas.push(this.input);// añadimos la tarea a la lista
      this.input = '';// espacio en blanco
    }
  }

}
