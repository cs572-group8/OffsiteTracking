import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataService } from './data.service';
import { Store, select } from '@ngrx/store';
import { State } from '../redux/reducers'
import * as LoaderActions from '../redux/actions/loader.action'

@Injectable({
  providedIn: 'root'
})
export class GeoService {


  googleapi: string = "http://localhost:5000/api/google";
  requestCounter: number = 0;

  constructor(
    private dataService: DataService,
    public http: HttpClient,
    private store: Store<State>
  ) {
    this.store.pipe(select('loader')).subscribe((result: any) => {
      this.requestCounter = result.counter
    })
  }
  getLocationInformation(latlng) {
    return this.http.get(`${this.googleapi}/geocode/${latlng}`)
  }

  getDistanceInformation(latlng, latlog, latlngdis, latlogdis) {
    return this.http.get(`${this.googleapi}/distance/${latlng},${latlog}/${latlngdis},${latlogdis}`).subscribe(
      res => {
        let locationInfo: any = res;
        let information: any = {}
        information.destination_address = locationInfo.destination_addresses[0]
        information.origin = locationInfo.origin_addresses[0]
        information.distance = locationInfo.rows[0].elements[0].distance.text
        information.duration = locationInfo.rows[0].elements[0].duration.text
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
        this.dataService.emitValue(information);
      },
      err => {
        this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
      }
    )
  }
}
