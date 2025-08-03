import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SlidebarComponent, CommonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isSidebarOpen = false;

  title = 'Painel Groove';

  excludedRoutes = ['/login'];

  constructor(
    public router: Router
  ) { }


  ngOnInit(): void {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    if (window.innerWidth <= 990) {
      this.isSidebarOpen = false;
    }
    else {
      this.isSidebarOpen = true;
    }
  }

  showDefaultLayout(): boolean {
    const currentRoute = this.router.url.split('?')[0].split('#')[0]; // Pega só o caminho puro, sem query e fragmentos
    return this.excludedRoutes.includes(currentRoute);
  }

}
