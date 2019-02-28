import { AuthService } from '../services/auth.service.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent {
  constructor(private authService: AuthService, private location: Location) {}
  today: number = Date.now();
  goBack() {
    this.location.back();
  }
}
