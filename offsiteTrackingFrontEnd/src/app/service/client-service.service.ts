import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  adminApi = "http://localhost:5000"
  constructor(public http: HttpClient, private router: Router) { }

  login(data) {
    return this.http.post('/auth/login', data)
  }

  saveEmployee(data) {

  }

  getEmployees() {

  }

  saveSchedule(data) {
    console.log(data)
    return this.http.post(`${this.adminApi}/api/admin/schedule`, data)
  }
}
