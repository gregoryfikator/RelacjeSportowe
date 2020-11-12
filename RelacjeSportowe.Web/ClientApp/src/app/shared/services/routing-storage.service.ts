import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingStorageService {

  private _storage: any;

  public get storage(): any {
    return this._storage;
  }

  public set storage(value: any) {
    this._storage = value;
  }
}
