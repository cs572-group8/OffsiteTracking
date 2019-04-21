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
    return this.http.post(`${this.adminApi}/auth/login`, data)
  }

  saveEmployee(data) {
    return this.http.post(`${this.adminApi}/api/employee/save`, data);
  }

  getEmployees() {
    return this.http.get(`${this.adminApi}/api/employee/all`)
  }

  saveSchedule(data) {
    return this.http.post(`${this.adminApi}/api/admin/schedule`, data)
  }
}
