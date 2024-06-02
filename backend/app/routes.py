from flask import Blueprint, request, jsonify
from .models import db, Note
from datetime import datetime

bp = Blueprint('api', __name__)

@bp.route('/notes', methods=['GET'])
def get_notes():
    notes = Note.query.all()
    return jsonify([note.to_dict() for note in notes])

@bp.route('/notes/<int:id>', methods=['GET'])
def get_note(id):
    note = Note.query.get_or_404(id)
    return jsonify(note.to_dict())

@bp.route('/notes', methods=['POST'])
def create_note():
    data = request.get_json()
    note = Note(
        title=data['title'],
        text=data['text'],
        topic=data.get('topic'),
        source=data.get('source'),
        tags=data.get('tags')
    )
    db.session.add(note)
    db.session.commit()
    return jsonify(note.to_dict()), 201

@bp.route('/notes/<int:id>', methods=['PUT'])
def update_note(id):
    data = request.get_json()
    note = Note.query.get_or_404(id)
    if 'title' in data:
        note.title = data['title']
    if 'text' in data:
        note.text = data['text']
    if 'topic' in data:
        note.topic = data['topic']
    if 'source' in data:
        note.source = data['source']
    if 'tags' in data:
        note.tags = data['tags']
    note.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify(note.to_dict())

@bp.route('/notes/<int:id>', methods=['DELETE'])
def delete_note(id):
    note = Note.query.get_or_404(id)
    db.session.delete(note)
    db.session.commit()
    return '', 204
