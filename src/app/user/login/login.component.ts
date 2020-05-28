import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/user';
import { AuthService } from "../../shared/services/authentication/auth.service";
import { UserService } from "../user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(private loginService: LoginService,
                private fb: FormBuilder,
                private router: Router,
                private authService: AuthService,
                private userService: UserService) {
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

                this.loginService.login(email, password).subscribe((response) => {
                    this.userService.userDetails = <User>{
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        role: response.role
                    };

                    this.authService.accessToken = response.accessToken;

                    this.router.navigate(['user/dashboard']);
                });
            } catch (err) {
                console.error(err);
            }
        }
    }

}
