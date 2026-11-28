// Organize the text transformation helper in the API services namespace.
namespace Practice.Api.Services;

// Provide reusable text transformation operations without storing instance state.
public static class TextModifier
{
    // Choose and apply a text transformation based on the requested mode.
    public static string Transform(string? text, string? mode)
    {
        // Convert a missing text value into an empty string before processing.
        var input = text ?? string.Empty;

        // Match the requested mode case-insensitively and return the transformed text.
        return (mode ?? "uppercase").ToLowerInvariant() switch
        {
            "uppercase" => input.ToUpperInvariant(),
            "titlecase" => System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(text.ToLowerInvariant()),
            "reverse" => new string(input.Reverse().ToArray()),
            _ => input
        };
    }
}
