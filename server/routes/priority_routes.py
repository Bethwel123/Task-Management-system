from flask import jsonify
from app import app
from models.priority import Priority

@app.route('/priorities', methods=['GET'])
def get_priorities():
    priorities = Priority.query.all()
    return jsonify([priority.do_dict() for priority in priorities])