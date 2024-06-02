import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [editedNote, setEditedNote] = useState(null);
    const [noteData, setNoteData] = useState({ title: '', text: '' });

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        axios.get('http://localhost:5000/notes')
            .then(response => setNotes(response.data))
            .catch(error => console.error(error));
    };

    const deleteNote = (id) => {
        axios.delete(`http://localhost:5000/notes/${id}`)
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            })
            .catch(error => console.error(error));
    };

    const updateNote = (id, updatedNote) => {
        axios.put(`http://localhost:5000/notes/${id}`, updatedNote)
            .then(() => {
                fetchNotes();
                setEditedNote(null);
            })
            .catch(error => console.error(error));
    };

    const handleEdit = (note) => {
        setEditedNote(note.id);
        setNoteData({ title: note.title, text: note.text });
    };

    const handleSave = (id) => {
        updateNote(id, noteData);
    };

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        {editedNote === note.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={noteData.title}
                                    onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                                />
                                <textarea
                                    value={noteData.text}
                                    onChange={(e) => setNoteData({ ...noteData, text: e.target.value })}
                                />
                                <button onClick={() => handleSave(note.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{note.title}</h3>
                                <p>{note.text}</p>
                                <button onClick={() => deleteNote(note.id)}>Delete</button>
                                <button onClick={() => handleEdit(note)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
