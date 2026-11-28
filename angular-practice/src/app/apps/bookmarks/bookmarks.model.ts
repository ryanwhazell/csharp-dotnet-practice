export interface Bookmark {
  id: string;
  title: string;
  url: string;
  tag: string;
  isFavorite: boolean;
  createdAt: string;
}

export interface CreateBookmarkRequest {
  title: string;
  url: string;
  tag: string;
  isFavorite: boolean;
}
