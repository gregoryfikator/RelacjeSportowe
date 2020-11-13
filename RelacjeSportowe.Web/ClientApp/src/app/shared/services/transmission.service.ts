import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { AddTransmissionEventTypeRequest, UpdateTransmissionEventTypeRequest } from 'src/app/models/dtos/requests/transmission-event-type-request';
import { AddTransmissionRequest, DeleteTransmissionRequest, EndTransmissionRequest, UpdateTransmissionRequest, VoteTransmissionRequest } from 'src/app/models/dtos/requests/transmission-request';
import { Transmission } from 'src/app/models/transmission';
import { TransmissionDetails } from 'src/app/models/transmission-details';
import { TransmissionEventType } from 'src/app/models/transmission-event-type';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  constructor(private httpClient: HttpClient) {
  }

  public addTransmission(request: AddTransmissionRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.Transmission.AddTransmission, request);
  }

  public addTransmissionEventType(request: AddTransmissionEventTypeRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.Transmission.AddTransmissionEventType, request);
  }

  public deleteTransmission(request: DeleteTransmissionRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.Transmission.DeleteTransmission, request);
  }

  public editTransmission(request: UpdateTransmissionRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.Transmission.UpdateTransmission, request);
  }

  public editTransmissionEventType(request: UpdateTransmissionEventTypeRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.Transmission.UpdateTransmissionEventType, request);
  }

  public endTransmission(transmissionId: number): Observable<any> {
    let request = new EndTransmissionRequest({
      id: transmissionId
    });

    return this.httpClient.post(Constants.Endpoints.Transmission.EndTransmission, request)
      .pipe(
        take(1)
      );
  }

  public getMyTransmissions(): Observable<Transmission[]> {
    return this.httpClient.get<Transmission[]>(Constants.Endpoints.Transmission.GetMyTransmissions)
      .pipe(
        take(1)
      );
  }

  public getNewestTransmissions(): Observable<Transmission[]> {
    return this.httpClient.get<Transmission[]>(Constants.Endpoints.Transmission.GetNewestTransmissions)
      .pipe(
        take(1)
      );
  }

  public getTopTransmissions(): Observable<Transmission[]> {
    return this.httpClient.get<Transmission[]>(Constants.Endpoints.Transmission.GetTopTransmissions)
      .pipe(
        take(1)
      );
  }

  public getTransmission(transmissionId: number): Observable<TransmissionDetails> {
    var params = new HttpParams();
    params = params.append("id", transmissionId.toString());
    return this.httpClient.get<TransmissionDetails>(Constants.Endpoints.Transmission.GetTransmission, { params: params })
      .pipe(
        take(1)
      );
  }

  public getTransmissionEventTypes(): Observable<TransmissionEventType[]> {
    return this.httpClient.get<TransmissionEventType[]>(Constants.Endpoints.Transmission.GetTransmissionEventTypes)
      .pipe(
        take(1)
      );
  }

  public getAllTransmissions(): Observable<Transmission[]> {
    return this.httpClient.get<Transmission[]>(Constants.Endpoints.Transmission.GetAllTransmissions)
      .pipe(
        take(1)
      );
  }

  public voteTransmission(request: VoteTransmissionRequest): Observable<any> {
    return this.httpClient.post(Constants.Endpoints.Transmission.VoteTransmission, request)
      .pipe(
        take(1)
      );
  }
}
