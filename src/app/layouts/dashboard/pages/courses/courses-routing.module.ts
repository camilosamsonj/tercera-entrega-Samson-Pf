import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: CoursesDetailComponent
  },

    {
    path: '',
    component: CoursesComponent,

  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
