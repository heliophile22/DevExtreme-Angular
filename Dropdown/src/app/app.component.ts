import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DplistComponent } from './dplist/dplist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DplistComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dropdown';
}