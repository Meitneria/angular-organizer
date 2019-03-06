import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-avatar',
  templateUrl: './group-avatar.component.html',
  styleUrls: ['./group-avatar.component.css']
})
export class GroupAvatarComponent implements OnInit {
  userAvatars = [
    'https://pp.userapi.com/c847219/v847219976/198f9e/lWMemFiKE8E.jpg',
    'https://pp.userapi.com/c847219/v847219976/198f9e/lWMemFiKE8E.jpg',
    'https://pp.userapi.com/c847219/v847219976/198f9e/lWMemFiKE8E.jpg',
    'https://pp.userapi.com/c847219/v847219976/198f9e/lWMemFiKE8E.jpg',
    'https://pp.userapi.com/c847219/v847219976/198f9e/lWMemFiKE8E.jpg'
  ]
  constructor() { }
  hidenAvatars = this.userAvatars.slice(3);
  shownAvatars = this.userAvatars.slice(0, 3);
  
  ngOnInit() {
  }
}
