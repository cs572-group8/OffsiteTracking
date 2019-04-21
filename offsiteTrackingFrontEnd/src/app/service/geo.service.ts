import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { config } from 'src/environments/configKeys';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  googleapi: String = "https://maps.googleapis.com/maps/api/geocode/json?";
  constructor(public http: HttpClient) {
  }

  getLocationInformation(latlng) {
    return this.http.get(`${this.googleapi}latlng=${latlng}&key=${config.googleMapsKey}`)
  }
}
