'use client';
import { useEffect, useState } from 'react';
import { getAccessToken, getTopArtists } from '../lib/spotify';
import Footer from '../src/components/footer'; 
import Header from '../src/components/header';
import '../src/app/styles.css';

const MyTopArtistsPage = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const accessToken = sessionStorage.getItem('spotifyAccessToken');
        
        if (!accessToken) {
          return;
        }

        const topArtists = await getTopArtists(accessToken);
        setArtists(topArtists);
      } catch (error) {
        setError('Failed to fetch top artists');
      }
    };

    fetchTopArtists();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    <Header />
      <h1>My Top 10 Spotify Artists</h1>
      <div className='tracks-container'>
        {artists.map((artist, index) => (
          <div key={index} className='track-card'>
            <img src={artist.images[0].url} alt={artist.name} />
            <p>{artist.name}</p>
          </div>
        ))}
        <Footer />

      </div>
    </div>
  );
};

export default MyTopArtistsPage;
