import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
constructor(private router:Router){}//inject the router service into the login component

navigateToDashboard():void {
  setTimeout(() => {
    this.router.navigate(['/dashboard']);
  }, 1500);
}

navigateToRegister():void{
  setTimeout(()=>{
    this.router.navigate(['/register'])
  })
}



}
