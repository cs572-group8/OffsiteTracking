import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientService } from '../service/client-service.service';
import { Observable } from 'rxjs';
import { GeoService } from '../service/geo.service';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  snackBarRef
  showFiller = false;

  lat: number;
  lng: number;
  locationChosen = false;

  latlng: String = '';

  employees: any = []
  address: any = {
    city: "",
    country: "",
    postalCode: "",
    state: "",
    street: ""
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: ClientService,
    private dataservice: DataService,
    private geoservice: GeoService,
    private snackBar: MatSnackBar
  ) {
    this.scheduleForm = this.formBuilder.group({
      placeName: ['', [Validators.required]],
      address: this.formBuilder.group({
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        location: ['', [Validators.required], this.locationValidator]
      }),
      schedule: this.formBuilder.group(
        {
          employeeId: ['', [Validators.required]],
          date: ['', [Validators.required]],
          description: ['', [Validators.required]]
        }
      )
    });

    this.getUserLocation()
  }

  ngOnInit() {
    this.getEmployees()
  }

  onChoseLocation(event) {
    let coords = event.coords;
    this.lat = coords.lat;
    this.lng = coords.lng;
    this.locationChosen = true;
    this.latlng = `${coords.lat},${coords.lng}`;
    this.scheduleForm.get("address").get('location').setValue(this.latlng)
    this.fillAdress();
  }

  fillAdress() {
    this.geoservice.getLocationInformation(this.latlng)
    this.dataservice.emitter.subscribe(res => {
      this.scheduleForm.get("address").get('street').setValue(res.street.trim())
      this.scheduleForm.get("address").get('city').setValue(res.city.trim())
      this.scheduleForm.get("address").get('state').setValue(res.state.trim())
      this.scheduleForm.get("address").get('postalCode').setValue(res.postalCode.trim())

      this.scheduleForm.get("address").get('location').updateValueAndValidity({ onlySelf: true, emitEvent: true })
      this.scheduleForm.get("address").get('street').updateValueAndValidity({ onlySelf: true, emitEvent: true })
      this.scheduleForm.get("address").get('city').updateValueAndValidity({ onlySelf: true, emitEvent: true })
      this.scheduleForm.get("address").get('state').updateValueAndValidity({ onlySelf: true, emitEvent: true })
      this.scheduleForm.get("address").get('postalCode').updateValueAndValidity({ onlySelf: true, emitEvent: true })
    })
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.locationChosen = true
      });
    }
  }

  locationValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          let val = control.value
          if (val != null && val.indexOf(',') != -1) {
            let coordinate = val.split(',')
            if (coordinate.length === 2) {
              coordinate[0] = parseFloat(coordinate[0])
              coordinate[1] = parseFloat(coordinate[1])
              if ((typeof coordinate[0] === 'number') && (typeof coordinate[1] === 'number')) {
                if ((coordinate[0] >= -180 && coordinate[0] <= 180) &&
                  (coordinate[1] >= -180 && coordinate[1] <= 180)) {
                  resolve(null)
                } else {
                  resolve({ 'invalid': true })
                }
              } else {
                resolve({ 'invalid': true })
              }
            } else {
              resolve({ 'invalid': true })
            }
          } else {
            resolve({ 'invalid': true })
          }
        }, 10);
      }
    );
    return promise;
  }

  save() {
    this.service.saveSchedule(this.scheduleForm.value).subscribe(
      res => {
        let response: any = res;
        Promise.resolve()
          .then(() => {
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
          });
      },
      err => {
        console.log(err);
      }
    )
  }

  showSnackBar(message) {
  }

  getEmployees() {
    this.service.getEmployees().subscribe(
      res => { this.employees = res },
      err => { console.log(err) }
    )
  }
}
