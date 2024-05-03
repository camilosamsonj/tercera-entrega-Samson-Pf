import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { AlumnosModule } from "./pages/alumnos/alumnos.module";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeModule } from "./pages/home/home.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { CursosModule } from "./pages/cursos/cursos.module";
import { UsersModule } from "./pages/users/users.module";
import { InscripcionesModule } from "./pages/inscripciones/inscripciones.module";



@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        SharedModule,
        HomeModule,
        AlumnosModule,
        DashboardRoutingModule,
        CursosModule,
        UsersModule,
        InscripcionesModule,
    ],
    exports: [DashboardComponent],
})
export class DashboardModule {}