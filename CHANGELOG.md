# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Bookmarks API in `Practice.Api` (Minimal API, in-memory storage):
  - `GET /api/bookmarks` returns all bookmarks.
  - `GET /api/bookmarks/{id}` returns one bookmark, or 404 if not found.
  - `POST /api/bookmarks` creates a bookmark and returns 201 Created.
  - `DELETE /api/bookmarks/{id}` removes a bookmark (204, or 404 if not found).
- `Bookmark` record and `CreateBookmarkRequest` record in `Practice.Api/Models`.
- Server-side validation on bookmark creation: title required, URL must be a valid http/https address, and duplicate URLs are rejected. All errors are returned together as a 400 validation response.
- Bookmark request samples in `Practice.Api.http`.

### Changed
- Moved `TransformRequest` and `TransformResponse` out of `Program.cs` into `Practice.Api/Models`.
- Moved text transformation logic out of the `/api/transform` endpoint into `Practice.Api/Services/TextModifier.cs`. Behavior is unchanged.

### Notes
- Bookmark data is held in memory and resets whenever the API restarts. Persistence is planned for a later version.

## [0.2.0] - 2025-11-27

### Added
- Simple UI created and tested (#6).
- CHANGELOG.md to track notable changes (#10).
- Groundwork for the Bookmarks app (#7).

### Changed
- Reorganized the repository into a cleaner directory structure to support multiple apps (#7).
- Prepared the project layout for the Bookmarks app (#7).
- Post-Thanksgiving bookkeeping and cleanup, with added explanations (#8).
- Updated the repository structure section in the README.

## [0.1.0] - 2025-11-25

### Added
- Initial README, revised for clarity and repository goals.

### Changed
- Renamed `README.txt` to `README.md`.