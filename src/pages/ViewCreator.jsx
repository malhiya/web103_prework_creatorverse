import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './ViewCreator.css';

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error.message);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  const handleDelete = async () => {
    const { error } = await supabase.from('creators').delete().eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error.message);
    } else {
      navigate('/');
    }
  };

  if (!creator) return <p>Loading creator details...</p>;

  return (
    <main className="view-creator-container">
      <button onClick={() => navigate('/')}>Home</button>
      <div className="creator-content">
        {creator.imageURL && (
          <div className="creator-image-container">
            <img src={creator.imageURL} alt={creator.name} />
          </div>
        )}
        <div className="creator-info">
          <h2 className="creator-name">{creator.name}</h2>
          <p className="creator-description">{creator.description}</p>
          <a href={creator.url} target="_blank" rel="noreferrer" className="creator-link">
            Visit Channel
          </a>
          <div className="creator-buttons">
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate(`/edit/${creator.id}`)}>Edit</button>
          </div>
        </div>
      </div>
    </main>
  );
}
