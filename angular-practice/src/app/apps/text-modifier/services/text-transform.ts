import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TransformResponse {
  transformedText: string;
  length: number;
}

@Injectable({
  providedIn: 'root',
})
export class TextTransform {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://localhost:5106';

  transformText(text: string, mode: string): Observable<TransformResponse> {
    return this.http.post<TransformResponse>(`${this.apiBaseUrl}/api/transform`, {
      text,
      mode,
    });
  }
}
