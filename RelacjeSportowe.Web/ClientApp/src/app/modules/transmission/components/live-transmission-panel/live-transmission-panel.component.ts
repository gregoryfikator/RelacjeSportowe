import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { VoteTransmissionRequest } from 'src/app/models/dtos/requests/transmission-request';
import { TransmissionDetails } from 'src/app/models/transmission-details';
import { TransmissionEvent } from 'src/app/models/transmission-event';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { TransmissionHubService } from 'src/app/shared/services/transmission-hub.service';
import { TransmissionService } from 'src/app/shared/services/transmission.service';

@Component({
  selector: 'app-live-transmission-panel',
  templateUrl: './live-transmission-panel.component.html',
  styleUrls: ['./live-transmission-panel.component.less']
})
export class LiveTransmissionPanelComponent implements OnInit, OnDestroy {

  @Input() public transmissionId: number;

  @Input() public transmissionEvents$: BehaviorSubject<TransmissionEvent[]> = new BehaviorSubject<TransmissionEvent[]>([]);

  @Input() public transmissionDetails: TransmissionDetails;

  private hasVoted: boolean = false;

  private transmissionsSubscription: Subscription;

  constructor(private transmissionService: TransmissionService,
    private transmissionHubService: TransmissionHubService,
    private routingStorageService: RoutingStorageService) {

    this.transmissionsSubscription = merge(
      this.transmissionService.getTransmission(this.routingStorageService.storage.id)
        .pipe(
          tap(x => this.transmissionDetails = x),
          map(x => {
            return x.transmissionEvents;
          })
        ),
      this.transmissionHubService.transmissionEventReceived,
      this.transmissionHubService.transmissionEventUpdateReceived
    )
      .subscribe((events: TransmissionEvent[]) => {
        let currentEvents = this.transmissionEvents$.value;

        events.forEach(event => {
          const updatedEventIndex = currentEvents.findIndex(x => x.id == event.id);

          if (updatedEventIndex > -1) {
            currentEvents.splice(updatedEventIndex, 1);
          }

          currentEvents.push(event);
        });

        currentEvents = currentEvents.sort((a, b) => b.id - a.id);

        this.transmissionEvents$.next(currentEvents);
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.transmissionsSubscription.unsubscribe();
  }

  public upvote(): void {
    this.vote(new VoteTransmissionRequest({ id: this.transmissionDetails.id, rating: 1 }));
  }

  public downvote(): void {
    this.vote(new VoteTransmissionRequest({ id: this.transmissionDetails.id, rating: -1 }));
  }

  private vote(request: VoteTransmissionRequest) {
    this.transmissionService.voteTransmission(request)
      .subscribe(() => {
        this.hasVoted = true;
      });
  }
}
