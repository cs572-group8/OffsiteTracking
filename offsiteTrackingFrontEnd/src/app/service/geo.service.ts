import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true&key=AIzaSyC-NMFFfz2z6i2ueicmi7NxdLaHGtb4pyU
export class GeoService {

  constructor(private db: AngularFireDatabase) {
  }
}
