import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoginPage = false;

  constructor(private router: Router, private authService: AuthService) {
    console.log('AppComponent initialized');
  }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit');
    // Subscribe to route changes to hide/show menu based on current page
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log('Route changed to:', event.urlAfterRedirects);
        this.isLoginPage = event.urlAfterRedirects === '/login';
      });

    // Check initial route
    this.isLoginPage = this.router.url === '/login';
    console.log('Initial route:', this.router.url, 'isLoginPage:', this.isLoginPage);
  }

  /**
   * Handle logout from menu
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
