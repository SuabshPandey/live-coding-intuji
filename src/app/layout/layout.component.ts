import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, ButtonModule, TooltipModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  sidebarExpanded = true;

  // Track which menu index is expanded
  expandedMenuIndex: number | null = null;

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  toggleMenu(index: number) {
    this.expandedMenuIndex = this.expandedMenuIndex === index ? null : index;
  }

  menuItems = [
    {
      label: 'Home',
      route: '/home',
      icon: 'pi pi-home',
    },

    {
      label: 'Products',
      icon: 'pi pi-briefcase',
      route: '/products',
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      route: '/users',
    },
  ];
}
