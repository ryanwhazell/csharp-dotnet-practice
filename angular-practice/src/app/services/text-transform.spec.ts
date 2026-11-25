import { TestBed } from '@angular/core/testing';
import { TextTransform } from './text-transform';

describe('TextTransform', () => {
  let service: TextTransform;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextTransform);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
