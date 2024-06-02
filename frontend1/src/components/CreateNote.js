import React, { useState } from 'react';
import axios from 'axios';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('');
  const [source, setSource] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = {
      title,
      text,
      topic: null, // or provide a valid topic value if available
      source,
      tags
    };

    console.log('Submitting note:', note); // Debugging statement

    try {
      const response = await axios.post('http://localhost:5000/notes', note); // Assuming backend runs on localhost:5000
      console.log('Note created:', response.data); // Debugging statement
      // Reset form
      setTitle('');
      setText('');
      setTopic('');
      setSource('');
      setTags('');
    } catch (error) {
      console.error('There was an error creating the note!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Text</label>
          <textarea 
            className="form-control" 
            id="text" 
            rows="3" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required 
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="topic" className="form-label">Topic</label>
          <input 
            type="text" 
            className="form-control" 
            id="topic" 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="source" className="form-label">Source</label>
          <input 
            type="text" 
            className="form-control" 
            id="source" 
            value={source} 
            onChange={(e) => setSource(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input 
            type="text" 
            className="form-control" 
            id="tags" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Note</button>
      </form>
    </div>
  );
};

export default CreateNote;
