using Practice.Api.Models;
using Practice.Api.Services;

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
    var result = TextModifier.Transform(request.Text, request.Mode);
    return Results.Ok(new TransformResponse(result, result.Length));
});

app.Run();
