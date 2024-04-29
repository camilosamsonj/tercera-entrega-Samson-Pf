import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { AlumnosModule } from "./pages/alumnos/alumnos.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CursosModule } from "./pages/cursos/cursos.module";



@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        SharedModule,
        AlumnosModule,
        CursosModule,
    ],
    exports: [DashboardComponent],
})
export class DashboardModule {}