import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BookmarkApi } from './services/bookmark-api';
import { Bookmark } from './bookmarks.model';

@Component({
  selector: 'app-bookmarks',
  imports: [FormsModule],
  templateUrl: './bookmarks.html',
  styleUrl: './bookmarks.less',
})

export class Bookmarks implements OnInit {
  private readonly api = inject(BookmarkApi);

  readonly bookmarks = signal<Bookmark[]>([]);
  readonly errors = signal<Record<string, string[]>>({});

  // Form fields (bound to the inputs with ngModel)
  title = '';
  url = '';
  tag = '';
  isFavorite = false;

  ngOnInit(): void {
    this.api.getAll().subscribe((list) => this.bookmarks.set(list));
  }

  add(): void {
    this.api
      .create({
        title: this.title,
        url: this.url,
        tag: this.tag,
        isFavorite: this.isFavorite,
      })
      .subscribe({
        next: (created) => {
          this.bookmarks.update((list) => [...list, created]);
          this.errors.set({});
          this.title = '';
          this.url = '';
          this.tag = '';
          this.isFavorite = false;
        },
        error: (err: HttpErrorResponse) => {
          this.errors.set(err.status === 400 ? (err.error?.errors ?? {}) : {});
        },
      });
  }

  remove(id: string): void {
    this.api.delete(id).subscribe(() => {
      this.bookmarks.update((list) => list.filter((b) => b.id !== id));
    });
  }
}
