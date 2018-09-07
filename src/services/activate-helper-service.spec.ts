import { ActivateHelperService } from './activate-helper.service';
import { inject, TestBed } from '@angular/core/testing';
import { NGX_DATATABLE_ACTIVATE_EVENTS, TableActivateEventType } from '../types';

describe('ActivateHelperService', () => {
  let service: ActivateHelperService;
  const defaultEvents: TableActivateEventType[] = [
    'keydown',
    'mouseenter',
    'click',
    'dblclick',
    'checkbox'
  ];

  describe('default token value', () => {
    beforeEach(inject([ActivateHelperService],
      (_service: ActivateHelperService) => {
        service = _service;
      }));

    it('should contain all events by default', () => {
      defaultEvents
        .forEach(e => expect(service.isAllowed(e)).toBeTruthy(`event ${e} is not present in the default token values`));
    });
  });

  describe('with provided token value', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {provide: NGX_DATATABLE_ACTIVATE_EVENTS, useValue: ['click', 'checkbox']}
        ],
      });
    });

    beforeEach(inject([ActivateHelperService],
      (_service: ActivateHelperService) => {
        service = _service;
      }));

    it('should allow only passed events', () => {
      expect(service.isAllowed('click')).toBeTruthy('click event is not allowed');
      expect(service.isAllowed('checkbox')).toBeTruthy('checkbox event is not allowed');

      expect(service.isAllowed('mouseenter')).toBeFalsy('mouseenter event is allowed');
      expect(service.isAllowed('keydown')).toBeFalsy('keydown event is allowed');
      expect(service.isAllowed('dblclick')).toBeFalsy('dblclick event is allowed');
    });
  });

});
