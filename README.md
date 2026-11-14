# Campus Events API

A RESTful API built with **NestJS and TypeScript** for managing campus events and their sessions.

## Features

- Retrieve all campus events.
- Retrieve upcoming events.
- Retrieve a single event by ID.
- Retrieve sessions belonging to an event.
- Retrieve an individual session.
- Create new events.
- Filter events by category, location, and publication status.
- Sort events by title or event date.
- Paginate event results.
- Validate incoming request data using DTOs and `class-validator`.
- Handle missing events and sessions with appropriate 404 responses.

## Technologies

- Node.js
- NestJS
- TypeScript
- class-validator
- class-transformer

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd campus-events-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run start:dev
```

The API runs at:

`http://localhost:3006/api`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | Retrieve events |
| GET | `/api/events/upcoming` | Retrieve upcoming events |
| GET | `/api/events/:id` | Retrieve one event |
| GET | `/api/events/:id/sessions` | Retrieve an event's sessions |
| GET | `/api/events/:id/sessions/:sessionId` | Retrieve one session |
| POST | `/api/events` | Create an event |

## Query Parameters

The events endpoint supports:

| Parameter | Description | Example |
|---|---|---|
| category | Filter by category | `technology` |
| location | Filter by location | `Main Campus` |
| isPublished | Filter by publication status | `true` |
| sortBy | Sort by `eventDate` or `title` | `title` |
| order | Sort direction: `asc` or `desc` | `asc` |
| page | Page number | `1` |
| limit | Number of results per page | `5` |

Example:

```text
GET /api/events?category=technology&page=1&limit=5
```

## Creating an Event

Send a POST request to:

`POST /api/events`

Example JSON body:

```json
{
  "title": "Intro to Cloud Computing",
  "description": "A beginner-friendly campus workshop.",
  "location": "Engineering Block, Room 2",
  "eventDate": "2026-12-04T09:00:00.000Z",
  "category": "technology",
  "isPublished": true
}
```

Valid categories:

- technology
- business
- academic
- sports
- social

Request validation is handled using `CreateEventDto` and the global `ValidationPipe`.

## Response and Error Handling

- `200 OK` — Successful GET request.
- `201 Created` — Successful event creation.
- `400 Bad Request` — Invalid request data or query parameters.
- `404 Not Found` — Event or session does not exist, or session does not belong to the requested event.

## Testing

The following API checks were performed:

1. Retrieve all events.
2. Retrieve upcoming events.
3. Retrieve a single event.
4. Retrieve sessions for an event.
5. Retrieve an individual session.
6. Create a new event successfully.
7. Submit an event without a title and verify the 400 response.
8. Request a nonexistent event and verify the 404 response.
9. Request a session under the wrong event and verify the 404 response.
10. Filter events by category.
11. Filter events by publication status.
12. Sort events alphabetically.
13. Retrieve paginated results.
14. Run the production build successfully.

## Data Storage

This project currently uses an in-memory repository with seeded event and session data.

Newly created events are stored while the server is running. Restarting the server resets the data to the original seed data.

## Build

Run:

```bash
npm run build
```

## Author

Campus Events API — CodeOps Module 4 Practical Exercise.
