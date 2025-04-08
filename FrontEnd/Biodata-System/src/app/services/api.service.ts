import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }
  testBackendConnection() {
    return this.http.get(`${this.baseUrl}/test`, { withCredentials: true });
  }
  // Create an HttpHeaders object with the token





  loginChristian(email: string, password: string): Observable<LoginResponse> {
    const loginData = { email, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginData);
  }
  registerChristian(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data,{withCredentials: true});
    
  }

  getChristians() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getChristianById(id: string) {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }
  createChristian(data: any) {
    return this.http.post(`${this.baseUrl}/users`, data);
  }
  updateChristian(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }
  deleteChristian(id: string) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  getBaptisms() {
    return this.http.get(`${this.baseUrl}/baptism`);
  }
  getBaptismById(id: string) {
    return this.http.get(`${this.baseUrl}/baptism/${id}`);
  }
  createBaptism(data: any) {
    return this.http.post(`${this.baseUrl}/baptism`, data);
  }
  updateBaptism(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/baptism/${id}`, data);
  }
  deleteBaptism(id: string) {
    return this.http.delete(`${this.baseUrl}/baptism/${id}`);
  }

  getEucharists() {
    return this.http.get(`${this.baseUrl}/eucharist`);
  }
  getEucharistById(id: string) {
    return this.http.get(`${this.baseUrl}/eucharist/${id}`);
  }
  createEucharist(data: any) {
    return this.http.post(`${this.baseUrl}/eucharist`, data);
  }
  updateEucharist(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/eucharist/${id}`, data);
  }
  deleteEucharist(id: string) {
    return this.http.delete(`${this.baseUrl}/eucharist/${id}`);
  }

  getConfirmations() {
    return this.http.get(`${this.baseUrl}/confirmation`);
  }
  getConfirmationById(id: string) {
    return this.http.get(`${this.baseUrl}/confirmation/${id}`);
  }
  createConfirmation(data: any) {
    return this.http.post(`${this.baseUrl}/confirmation`, data);
  }
  updateConfirmation(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/confirmation/${id}`, data);
  }
  deleteConfirmation(id: string) {
    return this.http.delete(`${this.baseUrl}/confirmation/${id}`);
  }

  getMarriages() {
    return this.http.get(`${this.baseUrl}/marriage`);
  }
  getMarriageById(id: string) {
    return this.http.get(`${this.baseUrl}/marriage/${id}`);
  }
  createMarriage(data: any) {
    return this.http.post(`${this.baseUrl}/marriage`, data);
  }
  updateMarriage(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/marriage/${id}`, data);
  }
  deleteMarriage(id: string) {
    return this.http.delete(`${this.baseUrl}/marriage/${id}`);
  }


}
