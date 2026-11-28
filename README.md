# C# & Full-Stack Practice Sandbox

A hands-on learning repository dedicated to expanding from front-end engineering into full-stack and software engineering roles—focusing on **C#**, **.NET**, and **Angular** application development.

## Purpose & Goals

- **Full-Stack & Backend Expansion:** Build fluency in C# and the .NET ecosystem alongside modern single-page front-end architectures.
- **Repository Ownership & Workflows:** Practice end-to-end GitHub ownership, including feature branching, structured pull requests, release changelogs, and maintainable technical documentation.

## Repository Structure

```text
csharp-dotnet-practice/
├── src/Practice/           # C# practice models, logic, and backend exercises
├── tests/Practice.Tests/   # Unit tests for C# components
├── angular-practice/       # Standalone Angular front-end sandbox (TypeScript + Less)
└── CHANGELOG.md            # Running log of notable workspace updates
```

## Projects

| Project | Status | What it demonstrates |
|---|---|---|
| Text Modifier | Complete | Angular data binding, client-side transforms, calling a .NET 8 Web API |
| Bookmarks | In progress | CRUD, persistence, and API design |

## Running Locally

1. Start the API: `cd src/Practice.Api` then `dotnet run` (listens on http://localhost:5106)
2. Start the front end: `cd angular-practice` then `npm install` and `ng serve`
3. Open http://localhost:4200
