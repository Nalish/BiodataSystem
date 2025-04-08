import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrected from 'styleUrl'
})
export class DashboardComponent {
  constructor(private router:Router, private apiService: ApiService){}
  christianCount: number = 0; // Added to store the count value

 


  addChristian() {
    this.christianCount++; // Update the class 
    alert("You can't add")
  }


  logout() {
    alert("Logging out...");
    // Redirect or clear session in real implementation
  }

  navigateToSearch(){
    setTimeout(() => {
      this.router.navigate(['/search'])
    }, 1500);
  }

  navigateToForm(){
    setTimeout(() => {
      this.router.navigate(['/form'])
    }, 1500);  }
}
