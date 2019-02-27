import { AuthService } from '../services/auth.service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent {
  constructor(private authService: AuthService) {}
  today: number = Date.now();
}
