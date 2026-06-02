import { Component, OnInit } from '@angular/core';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-doing',
  templateUrl: './doing.page.html',
  styleUrls: ['./doing.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponentModule],
})
export class DoingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
