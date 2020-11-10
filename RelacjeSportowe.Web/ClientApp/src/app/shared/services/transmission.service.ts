import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { AddTransmissionEventTypeRequest, EditTransmissionEventTypeRequest } from 'src/app/models/dtos/requests/transmission-event-type-request';
import { TransmissionEventType } from 'src/app/models/transmission-event-type';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  constructor(private httpClient: HttpClient) {
  }

  public addTransmissionEventType(request: AddTransmissionEventTypeRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.Transmission.AddTransmissionEventType, request);
  }

  public editTransmissionEventType(request: EditTransmissionEventTypeRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.Transmission.EditTransmissionEventType, request);
  }

  public getTransmissionEventTypes(): Observable<TransmissionEventType[]> {
    return this.httpClient.get<TransmissionEventType[]>(Constants.Endpoints.Transmission.GetTransmissionEventTypes)
      .pipe(
        take(1)
      );
  }
}
