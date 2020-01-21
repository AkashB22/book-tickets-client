import { TestBed } from '@angular/core/testing';

import { OrderTicketService } from './order-ticket.service';

describe('OrderTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderTicketService = TestBed.get(OrderTicketService);
    expect(service).toBeTruthy();
  });
});
