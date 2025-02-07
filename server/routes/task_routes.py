from flask import jsonify, request
from models.task import Task
from datetime import datetime
from app import app, db

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/tasks/<int:id>', methods=["GET"])
def get_task_by_id(id):
    task = Task.query.get_or_404(id)
    return jsonify(task.to_dict())

@app.route('/tasks', methods=['POST'])
def create_tasks():
    data = request.json

    # Parese the 'due_date' field
    if 'due_date' in data and data['due_date']:
        try:
            data['due_date'] = datetime.fromisoformat(data['due_date'])
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use ISO 8601 format.'})
        
    new_task = Task(**data)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task created successfully'}), 201

@app.route('/tasks/<int:id>', methods=['PATCH'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.json
    print("Received data:", data)  # Debug log

    try:
        # Handle date fields
        if 'due_date' in data and data['due_date']:
            data['due_date'] = datetime.fromisoformat(data['due_date'].split('T')[0])
        
        # Update fields
        for key, value in data.items():
            if hasattr(task, key):
                setattr(task, key, value)
        
        db.session.commit()
        return jsonify(task.to_dict())
    except Exception as e:
        print("Error:", str(e))  # Debug log
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})
