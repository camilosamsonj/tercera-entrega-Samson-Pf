import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  showFiller = false;

  isMobile(): boolean {

    return window.innerWidth <= 280;
  }

}
