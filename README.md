# Google Calendar Event Creation using NodeJs



## Description

This project automates the creation of Google Calendar events using NodeJS. It provides a simple way to programmatically manage calendar events through Google's Calendar API.



## Prerequisites

- Node.js installed
- Google Cloud Console account
- Google Calendar API enabled
- OAuth 2.0 credentials configured



## Environment Variables

Required environment variables:
- `GOOGLE_CLIENT_ID`: OAuth 2.0 Client ID
- `GOOGLE_CLIENT_SECRET`: OAuth 2.0 Client Secret



## Setup

1. Create `.env` file. And copy content from `.env.example`. Provide necessary values.
2. Run `node ./api/index.js`.

> If you are using vercel, run `vercel dev`.



## API Endpoints

### Create Calendar Event
`POST /api/meeting`

**Headers:**
```
Authorization: Bearer <refresh-token-of-google-outh>
```

**Body:**
```json
{
  "summary": "Event title",
  "description": "Event description",
  "startDateTime": "2023-01-01T10:00:00",
  "endDateTime": "2023-01-01T11:00:00",
  "guestEmails": []
}
```

### Update Calendar Event
`PATCH /api/meeting/:eventId`

**Parameters:**
- `eventId`: ID of the event to update

**Headers:**
```
Authorization: Bearer <refresh-token-of-google-outh>
```

**Body:**
```json
{
  "summary": "Updated title",
  "description": "Updated description",
  "startDateTime": "2023-01-01T10:00:00",
  "endDateTime": "2023-01-01T11:00:00",
  "guestEmails": []
}
```