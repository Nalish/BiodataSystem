import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl='http://localhost:3000' //Backend BaseURL

  constructor(private http:HttpClient) {}

  getUsers(){
    this.http.get('http://localhost:3000/api/users')
    .subscribe(data =>{
      console.log(data);
    })
  }

}
