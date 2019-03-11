import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'app-group-avatar',
  templateUrl: './group-avatar.component.html',
  styleUrls: ['./group-avatar.component.css']
})
export class GroupAvatarComponent implements OnChanges {
  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  @Input()
  users: User[];
  searchUsers: User[];

  ngOnChanges() {
    this.searchUsers = this.users;
  }

  onRemove(userId) {
    this.remove.emit(userId);
  }

  onChange(query: string) {
    const newQuery = query.toLowerCase()
    if (query) {
      this.searchUsers = this.users.filter(item => (
        item.email.toLowerCase().indexOf(newQuery) !== -1 ||
        item.displayName.toLowerCase().indexOf(newQuery) !== -1
      ))
    } else {
      this.searchUsers = this.users;
    }
  }

  constructor() { }
}
