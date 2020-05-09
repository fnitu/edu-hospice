import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

  }

  public testLogin(){
    this.loginService.testRegister().subscribe(() => {
      console.log('here');
    });
  }

}
