import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input() sidebarStatus: boolean = false;

  list = [
    {
      number: '1',
      name: 'Manage Categories',
      icon:'fa-solid fa-house',
      url: '/manage-categories',
    },
    {
      number: '2',
      name: 'Manage Sub Categories',
      icon: 'fa-solid fa-list',
      url: '/manage-sub-categories',
    },
    {
      number: '3',
      name: 'Manage Expenses',
      icon: 'fa-solid fa-money-check-dollar',
      url: '/manage-expenses',
    }
  ]
}