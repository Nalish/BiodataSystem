import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
>>>>>>> 728ff8a0f150c15e1eb073e0bff8ba685dc1c31f
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
<<<<<<< HEAD
constructor(private register: ApiService, private router: Router) { }


private fb = inject(FormBuilder)
form = this.fb.group({
  name: ['',Validators.required],
  email: ['',Validators.required],
  password: ['',Validators.required],
  role:['',Validators.required],
  father: ['',Validators.required],
  mother: ['',Validators.required],
  tribe: ['',Validators.required],
  clan: ['',Validators.required],
  birth_place: ['',Validators.required],
  birth_date: ['',Validators.required],
  sub_county: ['',Validators.required],
  residence: ['',Validators.required],
})

errorMessage = '';
successMessage = '';


ngOnInit(): void {
  this.onSubmitForm();
}

onSubmit():void {
  if (this.form.invalid) {
    this.errorMessage = 'Please fill in all required fields.';
    return;
  }
  this.register.registerChristian(this.form.value).subscribe(
    (response) => {
      console.log('Registration successful:', response);
      console.log(this.form);
      this.successMessage = 'Registration successful! Redirecting to login...';
      this.navigateToLogin();},
      
    (error: any) => {
      console.error('Registration failed:', error);
      this.errorMessage = error.error.message;
    }
  );


=======
  constructor(private router: Router) { }
  navigateToLogin(): void {
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 1000)
  }
>>>>>>> 728ff8a0f150c15e1eb073e0bff8ba685dc1c31f
}
navigateToLogin():void {
  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 1500);
}

onSubmitForm():void {
  setTimeout(() => {
    this.register.registerChristian(this.form.value).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.navigateToLogin();
      },
      (error: any) => {
        console.error('Registration failed:', error);
        this.errorMessage = error.error.message ||'Registration failed. Please try again.';
      }
    );
  }, 1500);

}
}