import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getAccessToken } from '../lib/spotify';


const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const { code } = router.query;

      if (code) {
        try {
          const response = await axios.get(`/api/auth?code=${code}`);
          const { accessToken } = response.data;

          sessionStorage.setItem('spotifyAccessToken', accessToken);
          router.push('/');
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      }
    };

    getToken();
  }, [router]);

  return <div>Loading...</div>;
};

export default Callback;
