from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# static routes (i.e. main HTML page built by Svelte)
# are automatically served by Flask under the base path
app = Flask(__name__, static_url_path="")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/cs178-input.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    availability = db.Column(db.String(120), unique=False, nullable=False)
    percentage = db.Column(db.Integer, unique=False, nullable=False)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/availability', methods=['POST'])
def set_availability():
    data = request.get_json()
    new_user = User(availability=data['availability'], percentage=data['percentage'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Availability set successfully'}), 200

@app.route('/availability', methods=['GET'])
def get_availability():
    users = User.query.all()
    return jsonify({'users': [user.availability for user in users]}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
