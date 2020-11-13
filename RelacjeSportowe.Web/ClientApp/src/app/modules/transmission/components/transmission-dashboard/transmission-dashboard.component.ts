import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-transmission-dashboard',
  templateUrl: './transmission-dashboard.component.html',
  styleUrls: ['./transmission-dashboard.component.less']
})
export class TransmissionDashboardComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public routeToMyTransmissions() {
    this.routeTo(Constants.Routing.TransmissionPaths.MyTransmissions);
  }

  public routeToAllTransmissions() {
    this.routeTo(Constants.Routing.TransmissionPaths.AllTransmissions);
  }

  public routeToAddTransmission() {
    this.routeTo(Constants.Routing.TransmissionPaths.AddTransmission); 
  }

  private routeTo(routingTarget: string) {
    this.router.navigate([routingTarget], {
      relativeTo: this.route
    });
  }
}
