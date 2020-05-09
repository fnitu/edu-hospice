import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['danut.chindris@test.com', Validators.email],
      password: ['testpassword', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      try {
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        this.loginService.login(email, password).subscribe((response => {
          this.router.navigate(['dashboard']);
          console.log(response);
        }));
      } catch (err) {
        console.error(err);
      }
    }
  }

}
