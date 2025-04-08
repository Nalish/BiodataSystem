import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
=======
import { CommonModule, NgFor } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
>>>>>>> b09d633fbd76c454dcb7857938cd1ba308dc0958

@Component({
  selector: 'app-search',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
<<<<<<< HEAD
export class SearchComponent implements OnInit{
  constructor(private apiService: ApiService) {}
=======
export class SearchComponent implements OnInit {

  // Add any methods or properties needed for the search functionality
  searchQuery: string = '';
  christians: any[] = []; // Replace 'any' with your actual data type
  selectedChristian: any = null;
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }
  // Method to handle search functionality

  ngOnInit(): void {
    this.displayChristians();
    // Initialization logic here
  }

  displayChristians():void {
    this.apiService.getChristians().subscribe((data) => {
      this.christians = data
    });
  }
  searchChristianById(id: string): void {
    this.apiService.getChristianById(id).subscribe((data) => {
      this.christians = [data]; // Assuming you want to display a single Christian
    });
  }
  // searchChristianByName(name: string): void {
  //   this.apiService.getChristianByName(name).subscribe((data) => {
  //     this.christians = data; // Assuming you want to display a list of Christians
  //   });
  // }


  clearSearch(): void {
    this.searchQuery = '';
    this.displayChristians(); // Reset to all Christians if search query is cleared 
  }


  searchChristianByName(name: string): void {
    this.apiService.getChristians().subscribe((christians: any[]) => {
      console.log(christians); // Check the structure!
      const found = christians.find(christian =>
        christian.name.toLowerCase().includes(this.searchQuery.toLowerCase().trim())
      );
      console.log(found); // Check the found Christian
      // If found, set the selectedChristian to the found Christian

      if (found) {
        this.selectedChristian = found;
        this.errorMessage = '';
      } else {
        this.selectedChristian = null;
        this.errorMessage = 'Christian not found.';
      }
    }, error => {
      this.errorMessage = 'Something went wrong. Try again.';
    });
  }

  



>>>>>>> b09d633fbd76c454dcb7857938cd1ba308dc0958

  ngOnInit(): void {
    this.apiService.testBackendConnection().subscribe({
      next: (res) => console.log('✅ Success:', res),
      error: (err) => console.error('❌ Error:', err)
    });
  }
  
}


