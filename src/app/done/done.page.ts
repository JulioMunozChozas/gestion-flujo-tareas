import { Component, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponentModule],
})
export class DonePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
