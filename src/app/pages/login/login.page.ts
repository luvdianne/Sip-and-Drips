import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { eye, eyeOff } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  passwordFieldType: 'password' | 'text' = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({ eye, eyeOff });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      await this.showToast('Please fill in all fields correctly', 'warning');
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Logging in...'
    });
    await loading.present();

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      async (user) => {
        await loading.dismiss();
        this.isLoading = false;

        if (user) {
          await this.showToast(`Welcome, ${user.firstName}!`, 'success');
          this.router.navigate(['/dashboard']);
        } else {
          await this.showToast('Invalid username or password', 'danger');
        }
      },
      async (error) => {
        await loading.dismiss();
        this.isLoading = false;
        await this.showToast('An error occurred. Please try again.', 'danger');
        console.error('Login error:', error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  private async showToast(message: string, color: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    await toast.present();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}