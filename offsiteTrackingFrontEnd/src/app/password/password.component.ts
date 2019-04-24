import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientService } from '../service/client-service.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../redux/reducers';
import { MatSnackBar } from '@angular/material';
import * as LoaderActions from '../redux/actions/loader.action'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  passwordMatch: boolean;
  errorMessage: string;
  requestCounter: number = 0

  constructor(
    private formBuilder: FormBuilder,
    private service: ClientService,
    private snackBar: MatSnackBar,
    private store: Store<State>) {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      verify: ['', [Validators.required], this.passwordValidator.bind(this)]
    });

    this.store.pipe(select('loader')).subscribe((result: any) => {
      this.requestCounter = result.counter
    })
  }

  passwordValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (this.passwordForm && control.value == this.passwordForm.get("password").value)
            resolve(null);
          else
            resolve({ 'invalid': true })
        }, 0);
      }
    );
    return promise;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.service.updateEmployee(this.passwordForm.value)
      .subscribe(
        (response: any) => {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        },
        err => {
          this.errorMessage = err.error.message
          this.snackBar.open(err.error.message, 'Close', { duration: 3000 });
          this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
        },
        () => {
          this.store.dispatch(new LoaderActions.Change({ counter: this.requestCounter - 1 }))
        }
      );
  }
}
