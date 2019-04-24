import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { config } from 'src/environments/configKeys';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  
  googleapi: string = "http://localhost:5000/api/google";
  constructor(private dataService: DataService, public http: HttpClient) {
  }

  getLocationInformation(latlng) {
    return this.http.get(`${this.googleapi}/geocode/${latlng}`).subscribe(
      res => {
        this.dataService.emitValue(res);
      },
      err => {
        console.log(err)
      }
    )
  }
 
  getDistanceInformation(latlng, latlog, latlngdis, latlogdis) {
    return this.http.get(`${this.googleapi}/distance/${latlng},${latlog}/${latlngdis},${latlogdis}`).subscribe(
      res => {
        console.log(res)
        let locationInfo: any = res;
        let information: any = {}
        information.destination_address = locationInfo.destination_addresses[0]
        information.origin = locationInfo.origin_addresses[0]
        information.distance = locationInfo.rows[0].elements[0].distance.text
        information.duration = locationInfo.rows[0].elements[0].duration.text
        this.dataService.emitValue(information);
      }
    )
  }
}
