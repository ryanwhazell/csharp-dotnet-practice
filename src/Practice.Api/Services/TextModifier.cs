namespace Practice.Api.Services;

public static class TextModifier
{
    public static string Transform(string? text, string? mode)
    {
        var input = text ?? string.Empty;

        return (mode ?? "uppercase").ToLowerInvariant() switch
        {
            "uppercase" => input.ToUpperInvariant(),
            "titlecase" => System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(text.ToLowerInvariant()),
            "reverse" => new string(input.Reverse().ToArray()),
            _ => input
        };
    }
}