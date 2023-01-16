import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {
  constructor( 
    private titleService: Title
    ) {
      this.titleService.setTitle("404 | The page you requested was not found.");
    }
}
