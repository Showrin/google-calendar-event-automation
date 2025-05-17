import { google } from 'googleapis';

import createGoogleAuthClient from "./createGoogleAuthClient.js";

export const getGoogleCalendarClient = (googleRefreshToken) => {
  const oAuth2Client = createGoogleAuthClient(googleRefreshToken);
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  return calendar;
}

export const createGoogleCalendarEvent = async (
  bearerToken,
  eventTitle,
  eventDescription,
  eventStartTimeISOString,
  eventEndTimeISOString,
  guestEmails,
) => {
  const calendar = getGoogleCalendarClient(bearerToken);
  const event = {
    summary: eventTitle,
    description: eventDescription || "",
    start: {
      dateTime:
        eventStartTimeISOString ||
        new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 mins from now
      timeZone: "Asia/Dhaka",
    },
    end: {
      dateTime:
        eventEndTimeISOString ||
        new Date(Date.now() + 35 * 60 * 1000).toISOString(), // 30 mins duration
      timeZone: "Asia/Dhaka",
    },
    attendees: guestEmails.map((email) => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: "meet-" + Date.now(),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };
  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data;
};

export const updateGoogleCalendarEvent = async (
  bearerToken,
  eventId,
  eventTitle,
  eventDescription,
  eventStartTimeISOString,
  eventEndTimeISOString,
  guestEmails
) => {
  const calendar = getGoogleCalendarClient(bearerToken);
  const event = {};

  if (eventTitle) {
    event.summary = eventTitle;
  }

  if (eventDescription) {
    event.description = eventDescription;
  }

  if (guestEmails) {
    event.attendees = guestEmails.map((email) => ({ email }));
  }

  if (eventStartTimeISOString) {
    event.start = {
      dateTime: eventStartTimeISOString,
      timeZone: "Asia/Dhaka",
    };
  }

  if (eventEndTimeISOString) {
    event.end= {
      dateTime: eventEndTimeISOString,
      timeZone: "Asia/Dhaka",
    };
  }

  const response = await calendar.events.patch({
    calendarId: "primary",
    eventId,
    resource: event,
  });

  return response.data;
};
