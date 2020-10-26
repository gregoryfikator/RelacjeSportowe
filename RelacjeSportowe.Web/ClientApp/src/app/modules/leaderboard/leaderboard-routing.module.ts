import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { LeaderboardDashboardComponent } from './components/leaderboard-dashboard/leaderboard-dashboard.component';
import { LeaderboardComponent } from './leaderboard.component';

const routes: Routes = [
  {
    path: Constants.Routing.BasicPaths.Empty,
    component: LeaderboardComponent,
    children: [
      {
        path: Constants.Routing.BasicPaths.Empty,
        component: LeaderboardDashboardComponent,
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule { }
