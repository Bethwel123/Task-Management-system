from .db import db
from datetime import datetime

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    priority = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(50))
    completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'priority': self.priority,
            'category': self.category,
            'completed': self.completed,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'created_at': self.created_at.isoformat()
        }
    
    def update(self, data):
        for key, value in data.items():
            setattr(self, key, value)
        return self