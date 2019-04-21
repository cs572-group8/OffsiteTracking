import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { config } from 'src/environments/configKeys';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  googleapi: String = "https://maps.googleapis.com/maps/api/geocode/json?";
  constructor(private dataService: DataService, public http: HttpClient) {
  }

  getLocationInformation(latlng) {
    return this.http.get(`${this.googleapi}latlng=${latlng}&key=${config.googleMapsKey}`).subscribe(
      res => {
        let locationInfo: any = res
        let info: any = {}
        const formatted_address = locationInfo.results[0].formatted_address.split(',')
        info.street = formatted_address[0]
        info.city = formatted_address[1]
        let statePostal = formatted_address[2].trim().split(" ")
        if (statePostal.length = 2) {
          info.state = statePostal[0]
          info.postalCode = statePostal[1]
        }
        info.country = formatted_address[3]
        this.dataService.emitValue(info);
      },
      err => {
        console.log(err)
      }
    )
  }
}
