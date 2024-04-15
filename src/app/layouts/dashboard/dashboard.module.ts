import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { AlumnosModule } from "./pages/alumnos/alumnos.module";
import { SharedModule } from "src/app/shared/shared.module";



@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        SharedModule,
        AlumnosModule,
    ],
    exports: [DashboardComponent],
})
export class DashboardModule {}