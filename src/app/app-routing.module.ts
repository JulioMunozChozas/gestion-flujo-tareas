import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workflow',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then( m => m.TodoPageModule)
  },
  {
    path: 'doing',
    loadChildren: () => import('./doing/doing.module').then( m => m.DoingPageModule)
  },
  {
    path: 'done',
    loadChildren: () => import('./done/done.module').then( m => m.DonePageModule)
  },
  {
    path: 'workflow',
    loadChildren: () => import('./workflow/workflow.module').then( m => m.WorkflowPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
