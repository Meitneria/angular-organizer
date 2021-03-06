import { AuthService } from '../services/auth.service.service';
import { Component, OnInit } from '@angular/core';
import { loadLContextFromNode } from '@angular/core/src/render3/discovery_utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  authService:  AuthService) { }

  ngOnInit() {
    this.authService.IsUserAuthorized()
  }

}
