import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-administration-dashboard',
  templateUrl: './administration-dashboard.component.html',
  styleUrls: ['./administration-dashboard.component.less']
})
export class AdministrationDashboardComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
  } 

  public routeToUsers(): void {
    this.routeTo(Constants.Routing.AdministrationPaths.Users);
  }

  public routeToTransmissions(): void {
    this.routeTo(Constants.Routing.AdministrationPaths.Transmissions);
  }

  public routeToEventsDictionary(): void {
    this.routeTo(Constants.Routing.AdministrationPaths.TransmissionEventTypes); 
  }

  private routeTo(routingTarget: string) {
    this.router.navigate([routingTarget], {
      relativeTo: this.route
    });
  }
}
