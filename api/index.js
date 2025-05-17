import express from "express";
import dotenv from "dotenv";

import getBearerToken from "../lib/getBearerToken.js";
import {
  createGoogleCalendarEvent,
  updateGoogleCalendarEvent,
} from "../lib/googleCalendarUtils.js";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/meeting", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  const {
    summary,
    description,
    guestEmails,
    startTimeISOString,
    endTimeISOString,
  } = req.body;

  if (!summary || !guestEmails?.length) {
    return res.status(400).json({ error: 'summary and guestEmails are required' });
  }

  try {
    const bearerToken = getBearerToken(req);
    
    const eventDetails = await createGoogleCalendarEvent(
      bearerToken,
      summary,
      description,
      startTimeISOString || new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 mins from now if no time provided
      endTimeISOString || new Date(Date.now() + 35 * 60 * 1000).toISOString(), // 30 mins duration if no time provided
      guestEmails
    );
    
    return res.json({
      message: 'Event created successfully',
      ...eventDetails,
    });
  } catch (err) {
    console.error('Google Calendar Error:', err.message);

    return res.status(500).json({ error: 'Failed to create event' });
  }
});

app.patch("/api/meeting/:eventId", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }
  
  try {
    const bearerToken = getBearerToken(req);
    const { eventId } = req.params;
    const {
      summary,
      description,
      guestEmails,
      startTimeISOString,
      endTimeISOString,
    } = req.body;

    const eventDetails = await updateGoogleCalendarEvent(
      bearerToken,
      eventId,
      summary,
      description,
      startTimeISOString,
      endTimeISOString,
      guestEmails
    );

    return res.json({
      message: "Event updated successfully",
      ...eventDetails,
    });
  } catch (err) {
    console.error("Google Calendar Error:", err.message);

    return res.status(500).json({ error: "Failed to update event" });
  }
});

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;
