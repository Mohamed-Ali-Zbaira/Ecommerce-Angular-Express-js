import { TestBed } from '@angular/core/testing';

import { AuthonfigInterceptor } from './authonfig.interceptor';

describe('AuthonfigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthonfigInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthonfigInterceptor = TestBed.inject(AuthonfigInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
