import { Component, Input } from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'app-group-avatar',
  templateUrl: './group-avatar.component.html',
  styleUrls: ['./group-avatar.component.css']
})
export class GroupAvatarComponent {
  @Input()
  users: User[];

  constructor() { }
}
