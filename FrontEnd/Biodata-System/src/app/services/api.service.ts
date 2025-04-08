import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';  // Backend URL

  constructor(private http: HttpClient) {}

  // Test if the backend is accessible
  testBackendConnection() {
    return this.http.get(`${this.baseUrl}/test`, { withCredentials: true });
  }

  // Login a user
  loginChristian(username: string, password: string): Observable<LoginResponse> {
    const loginData = { username, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginData);
  }

  // Register a user
  registerChristian(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data, { withCredentials: true });
  }

  // Get all Christians (requires authorization)
  getChristians(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/users`, { headers });
  }

  // Get a specific Christian by ID (requires authorization)
  getChristianById(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/users/${id}`, { headers });
  }

  // Create a new Christian (requires authorization)
  createChristian(data: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.baseUrl}/users`, data, { headers });
  }

  // Update a Christian's data (requires authorization)
  updateChristian(id: string, data: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.baseUrl}/users/${id}`, data, { headers });
  }

  // Delete a Christian (requires authorization)
  deleteChristian(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.baseUrl}/users/${id}`, { headers });
  }

  // Create the authorization header from the stored JWT token
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Similar methods for baptism, eucharist, confirmation, and marriage...

  // Get Baptisms
  getBaptisms(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/baptism`, { headers });
  }

  // Get Eucharists
  getEucharists(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/eucharist`, { headers });
  }

  // Get Confirmations
  getConfirmations(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/confirmation`, { headers });
  }

  // Get Marriages
  getMarriages(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/marriage`, { headers });
  }
}
