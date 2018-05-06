import { Component } from '@angular/core';

@Component({
  template: `
  <nav>
    <a routerLink="assembly">Assembly</a>
    <a routerLink="locomotives">Locomotives</a>
    <a routerLink="railroadcars">Railroad Cars</a>
  </nav>
  <router-outlet></router-outlet>`
})
export class TrainComponent {

}
