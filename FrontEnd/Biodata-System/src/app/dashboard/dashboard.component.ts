import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrected from 'styleUrl'
})
export class DashboardComponent {
  constructor(private router:Router){}
  christianCount: number = 0; // Removed 'const' to allow mutation


  addChristian() {
    this.christianCount++; // Update the class 
    alert("You can't add")
  }

  searchChristian() {
    alert("Search Christian functionality coming soon!");
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
