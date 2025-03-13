from flask import Flask, request, jsonify, send_from_directory
import os
import time
import uuid

# Replace the problematic import with either:
try:
    # Try older Werkzeug syntax
    from werkzeug.urls import url_quote, url_unquote as unquote
except ImportError:
    # Fall back to Python's standard library
    from urllib.parse import quote as url_quote, unquote

# Store requests in memory (would use a database in production)
requests_data = {}
notifications = {}


app = Flask(__name__)
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend')

# Add a new route for the root URL
@app.route('/', methods=['GET'])
def index():
    return send_from_directory(frontend_dir, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(frontend_dir, path)

@app.route('/api/requests', methods=['GET'])
def get_requests():
    return jsonify(list(requests_data.values()))

@app.route('/request', methods=['POST'])
def handle_request():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400

        # Validate incoming data
        if 'name' not in data or not data['name']:
            return jsonify({'error': 'Name is required'}), 400

        # Generate a unique ID for the request
        request_id = str(uuid.uuid4())
        timestamp = time.time()
        
        # Store the request
        requests_data[request_id] = {
            'id': request_id,
            'name': data['name'],
            'description': data.get('description', ''),
            'timestamp': timestamp,
            'status': 'pending'
        }

        return jsonify({
            'message': 'Request received',
            'id': request_id,
            'data': requests_data[request_id]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/respond/<request_id>', methods=['POST'])
def respond_to_request(request_id):
    if request_id not in requests_data:
        return jsonify({'error': 'Request not found'}), 404
    
    data = request.get_json()
    action = data.get('action')
    
    if action not in ['approve', 'reject', 'later']:
        return jsonify({'error': 'Invalid action'}), 400
    
    # Update request status
    requests_data[request_id]['status'] = action
    
    # Handle "come later" timing
    if action == 'later':
        minutes = int(data.get('minutes', 15))
        requests_data[request_id]['return_time'] = time.time() + (minutes * 60)
    
    # Create notification for the requester
    notifications[request_id] = {
        'request_id': request_id,
        'action': action,
        'message': get_notification_message(action, data.get('minutes'))
    }
    
    return jsonify({'success': True})

@app.route('/api/check-notification/<request_id>', methods=['GET'])
def check_notification(request_id):
    if request_id in notifications:
        notification = notifications[request_id]
        # Remove the notification after it's been seen
        # del notifications[request_id]
        return jsonify(notification)
    
    return jsonify({'message': 'No notification'})

def get_notification_message(action, minutes=None):
    if action == 'approve':
        return 'You may enter now.'
    elif action == 'reject':
        return 'The official is busy and cannot meet at this time.'
    elif action == 'later':
        return f'Please return in {minutes} minutes.'

if __name__ == '__main__':
    app.run(debug=True)
