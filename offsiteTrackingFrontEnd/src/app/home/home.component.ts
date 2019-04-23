import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ClientService } from '../service/client-service.service';
import { Store } from '@ngrx/store';
import { State } from '../redux/reducers'
import * as DetailActions from '../redux/actions/detail.action'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['employee', 'email', 'date', 'address', 'status', 'detail'];
  ELEMENT_DATA: PeriodicElement[] = []
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientservice: ClientService,
    private store: Store<State>,
    private router: Router) {
    this.getSchedules()
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getSchedules() {
    this.clientservice.getSchedules().subscribe(
      (res: PeriodicElement[]) => {
        this.ELEMENT_DATA = res
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      },
      err => {
        console.log(err);
      }
    )
  }

  detail(event, id) {
    const { scheduleId, detail } = { scheduleId: id, detail: true }
    this.store.dispatch(new DetailActions.SaveDetail({
      scheduleId, detail
    }))
    this.router.navigate(['Schedule'])
  }
}

export interface PeriodicElement {
  schedule: string,
  address: string;
  date: Date;
  email: string;
  employee: string;
  status: boolean;
}