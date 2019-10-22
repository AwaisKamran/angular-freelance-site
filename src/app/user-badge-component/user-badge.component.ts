import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.css']
})
export class UserBadgeComponent implements OnInit {

  @Input() profileImage: string;
  @Input() userName: string;
  @Input() userMessage: string;
  @Input() userRating: any;
  @Input() userExpertise: string; 

  constructor() { }

  ngOnInit() {
  }
}
