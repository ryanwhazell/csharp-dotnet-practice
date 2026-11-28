// Import the API data models and text transformation service.
using Practice.Api.Models;
using Practice.Api.Services;

// Create the web application builder from the command-line configuration.
var builder = WebApplication.CreateBuilder(args);

// Configure CORS so the Angular development server can call the API.
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

// Enable CORS processing for incoming requests.
app.UseCors("AngularDev");

// Define a health-check endpoint that reports API status and the current UTC time.
app.MapGet("/api/ping", () => new
{
    message = "Hello from C# Minimal API!",
    timestampUtc = DateTime.UtcNow
});

// Define the endpoint that transforms text and returns the result with its length.
app.MapPost("/api/transform", (TransformRequest request) =>
{
    var result = TextModifier.Transform(request.Text, request.Mode);
    return Results.Ok(new TransformResponse(result, result.Length));
});

// Create a new list from Bookmarks.cs.
var bookmarks = new List<Bookmark>();

app.MapGet("/api/bookmarks", () => bookmarks);

app.MapPost("/api/bookmarks", (CreateBookmarkRequest request) =>
{
    var errors = new Dictionary<string, string[]>();

    // We check to make sure the Title is not empty.
    if (string.IsNullOrWhiteSpace(request.Title))
        errors["title"] = new[] { "Title is required." };

    // We check to make sure the URL is valid. 
    if (!Uri.TryCreate(request.Url, UriKind.Absolute, out var uri)
        || (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps))
        errors["url"] = new[] { "Url must be a valid http or https address." };
    else if (bookmarks.Any(b => string.Equals(b.Url, uri.AbsoluteUri, StringComparison.OrdinalIgnoreCase)))
        errors["url"] = new[] { "That URL is already bookmarked." };

    // And if we see those errors, we return from the function and let the user know.
    if (errors.Count > 0)
        return Results.ValidationProblem(errors);

    // Create our user-submitted bookmark record.
    var bookmark = new Bookmark(
        Guid.NewGuid(),
        request.Title!.Trim(),
        uri!.AbsoluteUri,
        request.Tag?.Trim() ?? string.Empty,
        request.IsFavorite,
        DateTime.UtcNow);

    bookmarks.Add(bookmark);
    return Results.Created($"/api/bookmarks/{bookmark.Id}", bookmark);
});

// Return Bookmark by GUID.
app.MapGet("/api/bookmarks/{id:guid}", (Guid id) =>
{
    var bookmark = bookmarks.FirstOrDefault(b => b.Id == id);
    return bookmark is null ? Results.NotFound() : Results.Ok(bookmark);
});

// Delete Bookmark by GUID.
app.MapDelete("/api/bookmarks/{id:guid}", (Guid id) =>
{
    var removed = bookmarks.RemoveAll(b => b.Id == id);
    return removed == 0 ? Results.NotFound() : Results.NoContent();
});

// Start the web application and listen for incoming requests.
app.Run();
