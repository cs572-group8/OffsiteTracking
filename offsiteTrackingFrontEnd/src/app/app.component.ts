import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router:Router){}
  title = 'offsiteTrackingFrontEnd';

  showSchedule(){
    this.router.navigateByUrl('Schedule');
  }
  showEmployee(){
    this.router.navigateByUrl('user');
  }
}
