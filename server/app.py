from flask import Flask, jsonify, request
from flask_cors import CORS
from models.db import db
from flask_migrate import Migrate
import os
import logging

# configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure for Vercel
if os.environ.get('VERCEL_ENV') == 'production':
    # Use production database URL
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
else:
    # Local development database
    instance_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance')
    os.makedirs(instance_path, exist_ok=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(instance_path, "tasks.db")}'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
migrate = Migrate(app, db)

# Request logging middleware
@app.before_request
def log_request_info():
    logger.debug('Headers: %s', request.headers)
    logger.debug('Body: %s', request.get_data())

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({"error": "Internal server error"}), 500

# Health check endpoint
@app.route('/')
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Task Management API is running"
    })

# Import the routes
from models.task import Task
from models.priority import Priority
from routes import task_routes, priority_routes


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))
    app.run(host="0.0.0.0", port=port, debug=True)