import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({ creator, showLinks = true }) {
  return (
    <div className={`card ${!creator.imageURL ? 'no-image' : ''}`}>
      {creator.imageURL && (
        <div className="card-image-container">
          <img src={creator.imageURL} alt={creator.name} className="card-image" />
        </div>
      )}
      <h2 className="card-title">{creator.name}</h2>
      <p className="card-description">{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noreferrer" className="card-link">
        Visit Channel
      </a>
      {showLinks && (
        <div className="card-actions">
          <Link to={`/creator/${creator.id}`}>View</Link>
        </div>
      )}
    </div>
  );
}
