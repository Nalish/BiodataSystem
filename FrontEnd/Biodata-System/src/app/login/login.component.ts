import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

export interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false; // To indicate loading state

  constructor(private router: Router, private apiservice: ApiService) {}

  login() {
    if (this.username && this.password) {
      this.isLoading = true; // Set loading to true before the API call
      this.apiservice.loginChristian(this.username, this.password).subscribe({
        next: (response: LoginResponse) => {
          console.log('Login successful:', response);
          // Store the token in localStorage or use it as needed
          localStorage.setItem('authToken', response.token);

          // Navigate to dashboard after successful login
          this.navigateToDashboard();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login failed:', error);
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message; // Show the error message if present
          } else {
            this.errorMessage = 'An error occurred. Please try again later.'; // Default message
          }
          this.isLoading = false; // Stop loading on error
        },
      });
    } else {
      this.errorMessage = 'Please enter both username and password.'; // Basic validation for input fields
    }
  }

  navigateToDashboard(): void {
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1500); // Delay to show success message
  }

  navigateToRegister(): void {
    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 1000); // Delay to show registration page
  }
}
