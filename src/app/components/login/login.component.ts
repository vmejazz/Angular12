import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pageShowSelector, setPage } from 'src/app/reducers/page';
import { ConnectService } from '../../connect.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  showPage$ = this.store.select(pageShowSelector)

  constructor(
    private _connectService: ConnectService,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this._connectService.connectRequest(this.loginForm.value)
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/dashboard']);
          }
        },
        error => console.log('error', error)
      )
  }

  onLostPass() {
    this.store.dispatch(setPage())
  }

  get references(): FormArray {
    return this.loginForm.get('references') as FormArray;
  }

  goToDashboard() {
    this.router.navigateByUrl('dashboard')
  }
}
