import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  adminApi = "http://localhost:5000"
  constructor(public http: HttpClient) {
  }

  login(data) {
    return this.http.post(`${this.adminApi}/auth/login`, data)
  }

  saveEmployee(data) {
    return this.http.post(`${this.adminApi}/api/employee/save`, data);
  }

  updateEmployee(data) {
    return this.http.post(`${this.adminApi}/api/employee/update`, data);
  }
  getEmployees() {
    return this.http.get(`${this.adminApi}/api/employee/all`)
  }

  getSchedules() {
    return this.http.get(`${this.adminApi}/api/admin/schedules`)
  }

  getScheduleDetail(id) {
    return this.http.get(`${this.adminApi}/api/admin/detail/${id}`)
  }

  saveSchedule(data) {
    return this.http.post(`${this.adminApi}/api/admin/schedule`, data)
  }
}
