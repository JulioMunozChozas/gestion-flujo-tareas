import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoingPage } from './doing.page';

const routes: Routes = [
  {
    path: '',
    component: DoingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoingPageRoutingModule {}
