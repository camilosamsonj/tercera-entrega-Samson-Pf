import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
    {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'alumnos',
    loadChildren: () =>
        import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule),
  },
  {
    path: 'cursos',
    loadChildren: ()=>
        import('./pages/cursos/cursos.module').then((m)=>m.CursosModule),
  },
  {
    path: 'inscripciones',
    loadChildren: ()=>
      import('./pages/inscripciones/inscripciones.module').then((m)=>m.InscripcionesModule)
  },
  {
    path: 'users',
    loadChildren: ()=>
      import('./pages/users/users.module').then((m)=>m.UsersModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',

  },
  {
    path: '**',
    redirectTo: 'home',

  }


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
