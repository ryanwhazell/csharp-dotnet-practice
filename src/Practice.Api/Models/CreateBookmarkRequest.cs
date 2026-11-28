namespace Practice.Api.Models;

public record CreateBookmarkRequest(string? Title, string? Url, string? Tag, bool IsFavorite);
