namespace Practice.Api.Models;

// Define our Bookmark record.
public record Bookmark(
    Guid Id,
    string Title,
    string Url,
    string Tag,
    bool IsFavorite,
    DateTime CreatedAt
);
