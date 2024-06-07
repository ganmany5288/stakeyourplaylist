'use client';
import { useEffect, useState } from 'react';
import { getAccessToken, getTopTracks } from '../lib/spotify';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import '../src/app/styles.css';

interface Track {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}


const HomePage = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        let accessToken = sessionStorage.getItem('spotifyAccessToken');
        
        if (!accessToken) {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get('code');
    
          if (code) {
            accessToken = await getAccessToken(code);
            sessionStorage.setItem('spotifyAccessToken', accessToken);
          } else {
            const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&scope=user-top-read&redirect_uri=${encodeURIComponent('http://localhost:3000/callback')}`;
            window.location.href = authUrl;
            return;
          }
        }
    
        const topTracks = await getTopTracks(accessToken);
        setTracks(topTracks);
      } catch (error) {
        setError('Failed to fetch top tracks');
      }
    };
  
    fetchTopTracks();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    <Header />
      <h1>My Top 5 Spotify Tracks</h1>
      <div className="tracks-container">
        {tracks.map((track, index) => (
          <div key={index} className="track-card">
            <img src={track.album.images[0].url} alt={track.name} />
            <p>{track.name}</p>
            <p>by {track.artists.map(artist => artist.name).join(', ')}</p>
          </div>
        ))}
        <Footer />

      </div>
    </div>
  );
};

export default HomePage;
