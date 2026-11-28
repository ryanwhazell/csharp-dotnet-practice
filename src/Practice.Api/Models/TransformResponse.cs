// Organize the response model in the Practice API models namespace.
namespace Practice.Api.Models;

// Represent the transformed text and its character length returned by the API.
public record TransformResponse(string TransformedText, int Length);
