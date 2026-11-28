namespace Practice.Api.Models;

public record Boomkar(
    Guid Id,
    string Title,
    string Url,
    string Tag,
    bool IsFavorite,
    DateTime CreatedAt
);
