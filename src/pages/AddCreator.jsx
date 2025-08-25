import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './AddCreator.css';

export default function AddCreator() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('creators').insert([formData]);

    if (error) {
      console.error('Error adding creator:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="add-creator-container">
      <button onClick={() => navigate('/')}>Home</button>
      <h2 className="page-title">Add a New Creator</h2>
      <form className="add-creator-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter creator's name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="url">URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="Enter creator's URL"
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter a short description of the creator"
          ></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="imageURL">Image URL (optional)</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Creator</button>
        </div>
      </form>
    </div>
  );
}
