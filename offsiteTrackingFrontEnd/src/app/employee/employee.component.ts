import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../service/client-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  data;
  submitted = false;
  employeeForm: FormGroup;
  serviceErrors: any = {};

  constructor(private formBuilder: FormBuilder, private service: ClientService) { }
  invalidFirstName() {
    return (this.submitted && this.employeeForm.controls.firstName.errors != null);
  }

  invalidLastName() {
    return (this.submitted && this.employeeForm.controls.lastName.errors != null);
  }

  invalidEmail() {
    return (this.submitted && this.employeeForm.controls.email.errors != null);
  }

  invalidPostalCode() {
    return (this.submitted && this.employeeForm.controls.postalCode.errors != null);
  }
  invalidAddress() {
    return (this.submitted && this.employeeForm.controls.address.errors != null);
  }
  invalidCity() {
    return (this.submitted && this.employeeForm.controls.City.errors != null);
  }
  invalidPhoneNumber() {
    return (this.submitted && this.employeeForm.controls.phoneNumber.errors != null);
  }


  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      City: ['', [Validators.required]],
      State: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid == true) {
      return;
    }
    else {
      this.service.saveSchedule(this.employeeForm.value)
    }
  }
}
