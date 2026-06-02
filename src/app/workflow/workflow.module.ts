import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkflowPageRoutingModule } from './workflow-routing.module';

import { WorkflowPage } from './workflow.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    WorkflowPage,
    FormsModule,
    WorkflowPageRoutingModule
  ]
})
export class WorkflowPageModule {}
