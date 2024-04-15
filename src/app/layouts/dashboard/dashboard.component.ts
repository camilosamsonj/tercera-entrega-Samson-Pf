import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatDrawer, {static: true})
  drawer!: MatDrawer;


  constructor(private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.observer.observe(["(max-width: 800px)"])
    .subscribe((res) => {
      if(res.matches) {
        this.drawer.mode="over"
        this.drawer.close();
      } else {
        this.drawer.mode = "side";
        this.drawer.open();
      }
    })

  }

}
