import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-badge-component',
  templateUrl: './user-badge-component.component.html',
  styleUrls: ['./user-badge-component.component.css']
})
export class UserBadgeComponentComponent implements OnInit {

  @Input() profileImage: string;
  @Input() userName: string;
  @Input() userMessage: string;
  @Input() userRating: any;
  @Input() userExpertise: string; 

  constructor() { }

  ngOnInit() {
  }
}
