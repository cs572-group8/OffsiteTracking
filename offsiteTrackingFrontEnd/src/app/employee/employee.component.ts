import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../service/client-service.service';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { GeoService } from '../service/geo.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {

  lat: number;
  lng: number;
  latlng: String = '';
  locationChosen = false;
  address: any = {
    city: "",
    country: "",
    postalCode: "",
    state: "",
    street: ""
  }

  data;
  submitted = false;
  employeeForm: FormGroup;
  errorMessage: String;

  constructor(
    private formBuilder: FormBuilder,
    private service: ClientService,
    private dataservice: DataService,
    private geoservice: GeoService,
    private router: Router
  ) {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      type: ['employee'],
      postalCode: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getUserLocation()
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid == true) {
      return;
    } else {
      this.service.saveEmployee(this.employeeForm.value)
        .subscribe(
          (data: any) => {
            this.service.saveEmployee(data);
            console.log('employee saved successful');
            return this.router.navigate(['user']);
          },
          error => { this.errorMessage = error.error.message }
        );
    }
  }

  onChoseLocation(event) {
    console.log(event)
    let coords = event.coords;
    this.latlng = `${coords.lat},${coords.lng}`;
    this.locationChosen = true;
    this.fillAdress();
  }

  fillAdress() {
    this.geoservice.getLocationInformation(this.latlng)
    this.dataservice.emitter.subscribe(res => {
      this.address.street = res.street
      this.address.city = res.city
      this.address.state = res.state
      this.address.postalCode = res.postalCode
    })
  }
}
