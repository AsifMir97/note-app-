from flask import Flask
from flask_cors import CORS
from .models import db
from .routes import bp as api_bp
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Enable CORS for the frontend

    app.register_blueprint(api_bp)

    return app
