import axios from 'axios';
import querystring from 'querystring';
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:3000/callback';

const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');


export const getSpotifyAuthorizeURL = () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const scopes = 'user-top-read';
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  
  const authUrl = `${authEndpoint}?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  return authUrl;
};

export const getAccessToken = async (code: string) => {
  const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri,
  }), {
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
};

export const getTopTracks = async (accessToken: string) => {
  const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=30', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data.items;
};

export const getTopArtists = async (accessToken: string) => {
  const response = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=10', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data.items;
};

