import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private router:Router){}//inject the router service into the login component

navigateToDashboard():void {
  setTimeout(() => {
    this.router.navigate(['/dashboard']);
  }, 3000);
}




}
