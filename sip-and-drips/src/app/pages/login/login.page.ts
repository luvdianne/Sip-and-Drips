import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  login() {
    this.authService.validateUser(this.username, this.password).subscribe(
      (isValid) => {
        if (isValid) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred during login';
      }
    );
  }
}