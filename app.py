from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    availability = db.Column(db.String(120), unique=False, nullable=False)
    percentage = db.Column(db.Integer, unique=False, nullable=False)

@app.route('/')
def index():
    return render_template('index.html')

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
    db.create_all()
    app.run(debug=True)
