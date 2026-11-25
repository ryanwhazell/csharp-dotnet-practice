import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TextTransform } from './text-transform';

describe('TextTransform', () => {
  let service: TextTransform;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TextTransform);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('posts the text and mode to the .NET transform endpoint', () => {
    service.transformText('hello', 'uppercase').subscribe((response) => {
      expect(response.transformedText).toBe('HELLO');
      expect(response.length).toBe(5);
    });

    const request = httpTesting.expectOne('http://localhost:5106/api/transform');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ text: 'hello', mode: 'uppercase' });
    request.flush({ transformedText: 'HELLO', length: 5 });
  });
});
