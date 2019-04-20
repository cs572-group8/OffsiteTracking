import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  showFiller = false;
  constructor(private formBuilder: FormBuilder) {
    this.scheduleForm = this.formBuilder.group({
      placeName: ['', [Validators.required]],
      address: this.formBuilder.group({
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        location: [[], [Validators.required]]
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
  }
  save() {
    console.log(this.scheduleForm.value);
  }
}
