import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(public http: HttpClient, private router: Router) { }

  login(data) {

  }

  saveEmployee(data) {

  }

  getEmployees() {

  }

  saveSchedule(data) {
    //this.http.post('', data);
    console.log(data)
  }

  getSchedules() {

  }
}
