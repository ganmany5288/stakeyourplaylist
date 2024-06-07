import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import layout from '../src/app/layout';
import './index.css';
import Footer from '../src/components/footer'; 
import Header from '../src/components/header'; 
import Image from 'next/image';
import { getSpotifyAuthorizeURL } from '../lib/spotify';


interface UserProfile {
    display_name: string;
    images: { url: string }[];
  }


const LandingPage = () => {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
    const profile = sessionStorage.getItem('spotifyUserProfile');
    if (profile) {
        setUserProfile(JSON.parse(profile));
    }
    }, []);

    const forTopTracks = () => {
        router.push('/top-tracks');
    };

    const forTopArtists = () => {
        router.push('/top-artists');
    }

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&scope=user-top-read&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI!)}`;
    window.location.href = authUrl;
  };

  return (
    <div className="container">
    <Header />
    <div className="container">
      <div className="logo-container">
      <Image src="/title.png" width={550} height={216} layout="responsive" objectFit="contain" alt="Title" />
        {/* <img src="../src/app/title.png" alt="Website Logo" /> */}
      </div>
      <h1 className="header">TESTING 🛠️✨</h1>
      {userProfile ? (
        <div className="user-profile">
          <img src={userProfile.images[0]?.url} alt={userProfile.display_name} className="profile-picture" />
          <h2>{`Hello, ${userProfile.display_name}`}</h2>
        </div>
      ) : (
        <button className="button" onClick={handleLogin}>
          Log in to Spotify
        </button>
      )}      
      <button className="button" onClick={forTopTracks}>
        View My Top 5 Spotify Tracks
      </button>
      <button className="button" onClick={forTopArtists}>
        View My Top 10 Spotify Artists
      </button>

      {}
      <Footer />
    </div>
    </div>
  );
};

export default LandingPage;
