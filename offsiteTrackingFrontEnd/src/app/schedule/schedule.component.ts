import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientService } from '../service/client-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  showFiller = false;

  lat: number = 51.678418;
  lng: number = 7.809007;
  location: String = '';
  locationChosen = false;

  constructor(private formBuilder: FormBuilder, private service: ClientService) {
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
  }

  ngOnInit() {
    this.getUserLocation()
  }

  onChoseLocation(event) {
    let coords = event.coords;
    console.log(coords);
    this.location = `${coords.lat},${coords.lng}`;
    this.locationChosen = true;
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

       // navigator.geolocation.watchPosition;
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
                  console.log(coordinate)
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
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}
