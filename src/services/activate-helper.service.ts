import { Inject, Injectable } from '@angular/core';
import { NGX_DATATABLE_ACTIVATE_EVENTS, TableActivateEventType } from '../types';

/**
 * Manages activate events
 */
@Injectable({
  providedIn: 'root'
})
export class ActivateHelperService {

  constructor(@Inject(NGX_DATATABLE_ACTIVATE_EVENTS) private _allowedEvents: TableActivateEventType[]) {
  }

  isAllowed(eventName: TableActivateEventType): boolean {
    return this._allowedEvents.indexOf(eventName) >= 0;
  }
}
