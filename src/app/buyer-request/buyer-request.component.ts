import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buyer-request',
  templateUrl: './buyer-request.component.html',
  styleUrls: ['./buyer-request.component.css']
})
export class BuyerRequestComponent implements OnInit {

  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  navigateToDashboard(){
    this.router.navigate([`/dashboard`]);
  }

}
