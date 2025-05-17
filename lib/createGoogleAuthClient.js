import { google } from 'googleapis';

let GOOGLE_AUTH_CLIENT = null;

const createGoogleAuthClient = (refreshToken) => {
  if (GOOGLE_AUTH_CLIENT) {
    return GOOGLE_AUTH_CLIENT;
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  GOOGLE_AUTH_CLIENT = oAuth2Client;

  return GOOGLE_AUTH_CLIENT;
};

export default createGoogleAuthClient;
