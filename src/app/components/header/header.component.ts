import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isSidebarOpen = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  user: any;
  animationClass: string = '';
  profileDropdonw: boolean = false



  title = "Dashboard";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserFromToken();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      map(route => route.snapshot.data['title'] || 'Dashboard')
    ).subscribe(title => {
      this.title = title;
    });

    this.updateTitleFromRoute();
  }

  private updateTitleFromRoute() {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.title = route.snapshot.data['title'] || 'Dashboard';
  }


  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'b') {
      this.onToggleSidebar()
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }


  getAvatar(userId: string, avatar: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`
  }

  toggleDropdown() {
    if (this.profileDropdonw) {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.profileDropdonw = !this.profileDropdonw;
        this.animationClass = 'fade-in';
      }, 200); // Tempo da animação em ms
    } else {
      this.animationClass = 'fade-out';
      setTimeout(() => {
        this.profileDropdonw = !this.profileDropdonw;
        this.animationClass = 'fade-in';
      }, 200);
    }
  }
  closeDropdown() {
    this.animationClass = 'fade-out';
    setTimeout(() => {
      this.profileDropdonw = false;
      this.animationClass = 'fade-in';
    }, 200);
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdownElement = document.querySelector('.profile-dropdown');
    if (this.profileDropdonw && dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }


}  