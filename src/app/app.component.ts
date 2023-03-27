import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  routePath: string = 'products';
  constructor() {

  }

  goTo(path: string){
    this.routePath = path;
  }


}
