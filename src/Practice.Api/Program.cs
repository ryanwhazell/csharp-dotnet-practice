var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AngularDev");

app.MapGet("/api/ping", () => new
{
    message = "Hello from C# Minimal API!",
    timestampUtc = DateTime.UtcNow
});

app.MapPost("/api/transform", (TransformRequest request) =>
{
    var text = request.Text ?? string.Empty;

    var result = (request.Mode ?? "uppercase").ToLowerInvariant() switch
    {
        "uppercase" => text.ToUpperInvariant(),
        "titlecase" => System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(text.ToLowerInvariant()),
        "reverse" => new string(text.Reverse().ToArray()),
        _ => text
    };

    return Results.Ok(new TransformResponse(result, result.Length));
});

app.Run();

record TransformRequest(string? Text, string? Mode);
record TransformResponse(string TransformedText, int Length);