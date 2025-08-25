import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';
import './ShowCreators.css';

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCreators() {
      const { data } = await supabase.from('creators').select();
      setCreators(data || []);
    }

    fetchCreators();
  }, []);

  return (
    <div className="page-container">
      <div className="hero-container">
        <h1>Creatorverse</h1>
        <p>Discover the best content creators across platforms like YouTube, Instagram, TikTok, and more!</p>
        <button onClick={() => navigate('/add')}>Add New Creator</button>
      </div>

      <div className="show-creators-section">
        <h2>Featured Creators</h2>
        <div className="grid">
          {creators.length > 0 ? (
            creators.map((creator) => <Card key={creator.id} creator={creator} />)
          ) : (
            <p>No creators yet. Add one!</p>
          )}
        </div>
      </div>
    </div>
  );
}

