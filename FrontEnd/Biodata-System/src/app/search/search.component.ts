import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.testBackendConnection().subscribe({
      next: (res) => console.log('✅ Success:', res),
      error: (err) => console.error('❌ Error:', err)
    });
  }
  
}
