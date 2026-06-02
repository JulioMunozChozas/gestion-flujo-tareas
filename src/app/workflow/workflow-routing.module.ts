import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowPage } from './workflow.page';

const routes: Routes = [
  {
    path: '',
    component: WorkflowPage,
    children: [
      {
        path: 'todo',
        loadChildren: () => import('../todo/todo.module').then(m => m.TodoPageModule)
      },
      {
        path: 'doing',
        loadChildren: () => import('../doing/doing.module').then(m => m.DoingPageModule)
      },
      {
        path: 'done',
        loadChildren: () => import('../done/done.module').then(m => m.DonePageModule)
      },
      {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full'
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowPageRoutingModule {}
