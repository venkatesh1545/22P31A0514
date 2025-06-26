import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/redirect/${shortcode}`).then(res => {
      window.location.href = res.data.original_url;
    }).catch(() => {
      alert("Invalid or expired link");
    });
  }, []);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
