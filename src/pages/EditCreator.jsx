import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from('creators').select().eq('id', id).single();
      if (error) {
        console.error('Fetch error:', error.message);
      } else if (data) {
        setFormData({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || '',
        });
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('creators')
      .update(formData)
      .eq('id', id);

    if (error) {
      console.error('Update error:', error.message);
    } else {
      navigate(`/creator/${id}`);
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('creators').delete().eq('id', id);

    if (error) {
      console.error('Delete error:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <main>
      <h2>Edit Creator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          URL
          <input type="url" name="url" value={formData.url} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </label>
        <label>
          Image URL
          <input type="url" name="imageURL" value={formData.imageURL} onChange={handleChange} />
        </label>

        <button type="submit">Update Creator</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>
          Delete Creator
        </button>
      </form>
    </main>
  );
}
