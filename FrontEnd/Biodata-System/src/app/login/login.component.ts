import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { FormsModule } from '@angular/forms';

export interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
constructor(private login: ApiService, private router: Router) { }


private fb = inject(FormBuilder)
form = this.fb.group({
  email: ['',Validators.required],
  password: ['',Validators.required]

})

errorMessage = '';
successMessage = '';


ngOnInit(): void {
}

onSubmit():void {
  if (this.form.invalid) {
    this.errorMessage = 'Please fill in all required fields.';
    return;
  }
  this.login.loginChristian(this.form.value).subscribe(
    (response) => {
      localStorage.setItem('user', JSON.stringify(response))
      console.log('Login successful:', response);
      this.successMessage = 'Login successful! Redirecting to dashboard...';
      this.navigateToDashboard();
    },
    (error: any) => {
      console.error('Login failed:', error);
      this.errorMessage = error.error.message ||'Invalid email or password. Please try again.';
    }
  );
}


navigateToDashboard():void {
  setTimeout(() => {
    this.router.navigate(['/dashboard']);
  }, 1500);
}

  navigateToRegister(): void {
    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 1000); // Delay to show registration page
  }
}
