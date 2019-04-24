import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientService } from '../service/client-service.service';
import { Observable } from 'rxjs';
import { GeoService } from '../service/geo.service';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers';
import { IScheduleDetail } from '../models/scheduledetail.model';
import * as DetailActions from '../redux/actions/detail.action'
import * as LoaderActions from '../redux/actions/loader.action'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  title = "Create Schedule"
  scheduleForm: FormGroup;
  snackBarRef
  showFiller = false;

  lat: number;
  lng: number;
  locationChosen = false;

  latlng: String = '';
  employees: any = []
  scheduleDetail: IScheduleDetail = {
    scheduleId: "",
    detail: false
  }
  requestCounter: number = 0
  constructor(
    private formBuilder: FormBuilder,
    private service: ClientService,
    private dataservice: DataService,
    private geoservice: GeoService,
    private snackBar: MatSnackBar,
    private store: Store<State>
  ) {
    this.store.pipe(select('detail')).subscribe(
      data => {
        this.scheduleDetail = data
      }
    );
    this.store.pipe(select('loader')).subscribe((result: any) => {
      this.requestCounter = result.counter
    })
    this.scheduleForm = this.formBuilder.group({
      placeName: [{ value: '', disabled: this.scheduleDetail.detail || this.requestCounter > 0 }, [Validators.required]],
      address: this.formBuilder.group({
        state: [{ value: '', disabled: this.scheduleDetail.detail || this.requestCounter > 0 }, [Validators.required]],
        city: [{ value: '', disabled: this.scheduleDetail.detail || this.requestCounter > 0 }, [Validators.required]],
        street: [{ value: '', disabled: this.scheduleDetail.detail || this.requestCounter > 0 }, [Validators.required]],
        postalCode: [{ value: '', disabled: this.scheduleDetail.detail || this.requestCounter > 0 }, [Validators.required]],
        location: [{ value: '', disabled: this.scheduleDetail.detail || this.requestCounter > 0 }, [Validators.required], this.locationValidator]
      }),
      schedule: this.formBuilder.group(
        {
          employeeId: [{ value: '', disabled: this.scheduleDetail.detail || this.requestCounter > 0 }, [Validators.required]],
          date: [{ value: '', disabled: this.scheduleDetail.detail || this.requestCounter > 0 }, [Validators.required]],
          description: [{ value: '', disabled: this.scheduleDetail.detail || this.requestCounter > 0 }, [Validators.required]]
        }
      )
    });

    this.getUserLocation()
    if (this.scheduleDetail.detail) {
      this.title = "Schedule Details"
      this.getScheduleDetail();
    }
  }

  ngOnInit() {
    this.getEmployees()
  }

  onChoseLocation(event) {
    if (!this.scheduleDetail.detail || this.requestCounter > 0) {
      let coords = event.coords;
      this.lat = coords.lat;
      this.lng = coords.lng;
      this.locationChosen = true;
      this.latlng = `${coords.lat},${coords.lng}`;
      this.scheduleForm.get("address").get('location').setValue(this.latlng)
      this.fillAdress();
    }
  }

  fillAdress() {
    this.geoservice.getLocationInformation(this.latlng).subscribe(
      (res: any) => {
        this.scheduleForm.get("address").get('street').setValue(res.street.trim())
        this.scheduleForm.get("address").get('city').setValue(res.city.trim())
        this.scheduleForm.get("address").get('state').setValue(res.state.trim())
        this.scheduleForm.get("address").get('postalCode').setValue(res.postalCode.trim())

        this.scheduleForm.get("address").get('location').updateValueAndValidity({ onlySelf: true, emitEvent: true })
        this.scheduleForm.get("address").get('street').updateValueAndValidity({ onlySelf: true, emitEvent: true })
        this.scheduleForm.get("address").get('city').updateValueAndValidity({ onlySelf: true, emitEvent: true })
        this.scheduleForm.get("address").get('state').updateValueAndValidity({ onlySelf: true, emitEvent: true })
        this.scheduleForm.get("address").get('postalCode').updateValueAndValidity({
          onlySelf: true, emitEvent: true
        })
      },
      err => {
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
      },
      () => {
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
      }
    )
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
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
      },
      () => {
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
      }
    )
  }

  showSnackBar(message) {
  }

  getEmployees() {
    this.service.getEmployees().subscribe(
      res => { this.employees = res },
      err => {
        console.log(err)
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
      },
      () => {
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
      }
    )
  }
  place = {
    "address": {
      "state": "",
      "city": "",
      "street": "",
      "postalCode": "",
      "location": ""
    },
    "placeName": "",
    "schedule": {
      "date": "",
      "employeeId": "",
      "description": ""
    }
  };
  getScheduleDetail() {
    this.service.getScheduleDetail(this.scheduleDetail.scheduleId)
      .subscribe(
        (result: any) => {
          let coord = result.address.location;
          result.address.location = `${coord[0]},${coord[1]}`
          this.lat = coord[0];
          this.lng = coord[1];
          result.schedule = result.schedule[0]
          result.schedule.date = result.schedule.date.split('.')[0]
          this.place = result
        },
        err => {
          console.log(err);
          this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
        },
        () => {
          this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
        }
      )
  }

  ngOnDestroy(): void {
    this.store.dispatch(new DetailActions.DeleteDetail())
  }
}
