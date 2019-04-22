import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'geospatial',
  templateUrl: './geospatial.component.html',
  styleUrls: ['./geospatial.component.scss']
})
export class GeospatialComponent implements OnInit {
   lat: any;
   lng: any;

  location

  public origin: any;
  public destination: any;
  constructor(private route: ActivatedRoute) {    
    route.queryParams.subscribe(params => { this.location = params['location']; });
    this.getUserLocation();
  }

  ngOnInit() {}
    
   private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        
        this.getDirection();
      });
    }
  }
  getDirection() {
      console.log(this.lat);
          
     this.origin = { lat: parseFloat(this.lat), lng: parseFloat(this.lng) };
    this.destination = { lat: parseFloat(this.location[0]) , lng: parseFloat(this.location[1]) }
 // this.origin = { lat: 24.799448, lng: 120.979021 };
 // this.destination = { lat: 24.799524, lng: 120.975017 };
  }
}