// Organize the request model in the Practice API models namespace.
namespace Practice.Api.Models;

// Represent the text and transformation mode sent by the API caller.
public record TransformRequest(string? Text, string? Mode);
