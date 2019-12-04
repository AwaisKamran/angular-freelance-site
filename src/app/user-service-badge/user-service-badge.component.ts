import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-service-badge',
  templateUrl: './user-service-badge.component.html',
  styleUrls: ['./user-service-badge.component.css']
})
export class UserServiceBadgeComponent implements OnInit {
  @Input() service: any;
  @Input() buyService: boolean; 
  @Output() openDialog: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  showDataDialog(service){
    this.openDialog.emit(service);
  }
}
