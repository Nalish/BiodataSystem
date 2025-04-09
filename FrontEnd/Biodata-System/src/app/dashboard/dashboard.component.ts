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
  constructor(private router: Router, private apiService: ApiService) { }
  christianCount: number = 0; // Added to store the count value

  ngOnInit(): void {
    this.loadUserCount();
  }

  loadUserCount(): void {
    this.apiService.getDummyChristianCount().subscribe((data) => {
      this.christianCount = data.count; // Update the class property with the count value 
    },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }


  addChristian() {
    this.christianCount++; // Update the class 
    alert("You can't add")
  }


  logout() {
    alert("Logging out...");
    // Redirect or clear session in real implementation
  }

  navigateToSearch() {
    setTimeout(() => {
      this.router.navigate(['/search'])
    }, 1500);
  }

  navigateToForm() {
    setTimeout(() => {
      this.router.navigate(['/form'])
    }, 1500);
  }

      logoutChristian() {
        const email = localStorage.getItem('user'); // Retrieve the email from local storage
        if (email) {
          this.apiService.logoutChristian().subscribe(
            (response) => {
              console.log('Logout successful:', response);
              localStorage.removeItem('user'); // Clear the email from local storage
              alert('Logout successful! Redirecting to login...');
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1500);
            },
            (error: any) => {
              console.error('Logout failed:', error);
            }
          );
        } else {
          console.error('No email found in local storage.');
          alert('Logout failed: No user information found.');
        }
      }
    
}
