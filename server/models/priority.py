from .db import db

class Priority(db.Model):
    __tablename__ = 'priorities'

    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(7), nullable=False)

    def to_dict(self):
        return {
            'id' : self.id,
            'level' : self.level,
            'color' : self.color
        }