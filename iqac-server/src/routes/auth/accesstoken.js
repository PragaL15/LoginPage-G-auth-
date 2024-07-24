const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

// Function to get user's calendar events
const getCalendarEvents = async (accessToken) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  } catch (error) {
    console.error('Error getting calendar events:', error);
    throw error;
  }
};

// Function to refresh the access token
const refreshAccessToken = async (refreshToken) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const { credentials } = await oauth2Client.getAccessToken();

    return credentials.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

module.exports = { getCalendarEvents, refreshAccessToken };
