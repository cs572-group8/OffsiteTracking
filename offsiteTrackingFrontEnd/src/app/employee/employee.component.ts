import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClientService } from '../service/client-service.service';
import { GeoService } from '../service/geo.service';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers'
import * as LoaderActions from '../redux/actions/loader.action'
import { MatSnackBar } from '@angular/material';

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

  requestCounter: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private service: ClientService,
    private geoservice: GeoService,
    private store: Store<State>,
    private snackBar: MatSnackBar,
  ) {
    this.store.pipe(select('loader')).subscribe((result: any) => {
      this.requestCounter = result.counter
    })
    this.employeeForm = this.formBuilder.group({
      firstName: [{ value: '', disabled: this.requestCounter > 1 }, Validators.required],
      lastName: [{ value: '', disabled: this.requestCounter > 1 }, Validators.required],
      jobTitle: [{ value: '', disabled: this.requestCounter > 1 }, Validators.required],
      email: [{ value: '', disabled: this.requestCounter > 1 }, [Validators.required, Validators.email]],
      phone: [{ value: '', disabled: this.requestCounter > 1 }, [Validators.required]],
      address: [{ value: '', disabled: this.requestCounter > 1 }, [Validators.required]],
      city: [{ value: '', disabled: this.requestCounter > 1 }, [Validators.required]],
      state: [{ value: '', disabled: this.requestCounter > 1 }, [Validators.required]],
      type: ['employee'],
      postalCode: [{ value: '', disabled: this.requestCounter > 1 }, [Validators.required]]
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
          (response: any) => {
            this.employeeForm.reset({ onlySelf: false, emitEvent: false })
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
          },
          err => {
            this.errorMessage = err.error.message
            this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
            this.snackBar.open(err.error.message, 'Close', { duration: 3000 });
          },
          () => {
            this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
          }
        );
    }
  }

  onChoseLocation(event) {
    if (this.requestCounter <= 0) {
      let coords = event.coords;
      this.lat = coords.lat;
      this.lng = coords.lng;
      this.locationChosen = true;
      this.latlng = `${coords.lat},${coords.lng}`;
      this.fillAdress();
    }
  }

  fillAdress() {
    this.geoservice.getLocationInformation(this.latlng).subscribe(
      (res: any) => {
        this.employeeForm.get('address').setValue(res.street.trim())
        this.employeeForm.get('city').setValue(res.city.trim())
        this.employeeForm.get('state').setValue(res.state.trim())
        this.employeeForm.get('postalCode').setValue(res.postalCode.trim())

        this.employeeForm.get('address').updateValueAndValidity({ onlySelf: true, emitEvent: true })
        this.employeeForm.get('city').updateValueAndValidity({ onlySelf: true, emitEvent: true })
        this.employeeForm.get('state').updateValueAndValidity({ onlySelf: true, emitEvent: true })
        this.employeeForm.get('postalCode').updateValueAndValidity({ onlySelf: true, emitEvent: true })
      },
      err => {
        console.log(err)
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
      },
      () => {
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
      }
    )
  }
}
