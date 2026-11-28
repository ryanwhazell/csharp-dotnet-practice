import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookmark, CreateBookmarkRequest } from '../bookmarks.model';

@Injectable({ providedIn: 'root' })
export class BookmarkApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5106/api/bookmarks';

  getAll(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.baseUrl);
  }

  create(request: CreateBookmarkRequest): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.baseUrl, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
