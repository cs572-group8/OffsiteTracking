import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  adminApi = "http://localhost:5000"
  constructor(public http: HttpClient, private userservice: UserService) { }

  login(data) {
    return this.http.post(`${this.adminApi}/auth/login`, data)
    // .subscribe(
    //   res => {
    //     this.userservice.saveUser(res)
    //     this.userservice.emitValue("logged");
    //     return this.router.navigate(['user']);
    //   },
    //   err => {
    //     this.userservice.emitValue(err);
    //   }
    // )
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
