import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderboardComponent } from './leaderboard.component';
import { LeaderboardDashboardComponent } from './components/leaderboard-dashboard/leaderboard-dashboard.component';


@NgModule({
  declarations: [
    LeaderboardComponent,
    LeaderboardDashboardComponent
  ],
  imports: [
    CommonModule,
    LeaderboardRoutingModule
  ]
})
export class LeaderboardModule { }
